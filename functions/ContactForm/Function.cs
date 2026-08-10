using System.Net;
using System.Text.Json;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Amazon.SimpleEmailV2;
using Amazon.SimpleEmailV2.Model;
using ContactForm.Models;
using ContactForm.Validators;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace ContactForm;

public class Function
{
    private static readonly AmazonSimpleEmailServiceV2Client Ses = new ();
    
    /// <summary>
    /// Handler da Lambda de contato. Valida o request, rejeita honeypot e
    /// envia o e-mail via SES.
    /// </summary>
    /// <param name="request">Evento do API Gateway (AWS_PROXY).</param>
    /// <param name="context">Contexto de execução da Lambda (logs).</param>
    /// <returns>Resposta no formato do API Gateway, com headers CORS.</returns>
    public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
    {
        try
        {
            var contactForm = JsonSerializer.Deserialize<ContactRequest>(request.Body);
            
            // Verificação de honeypot
            if (!string.IsNullOrEmpty(contactForm?.Website))
            {
                return Ok("Mensagem recebida. Obrigado!");
            }
            
            var errors = ContactFormValidator.Validate(contactForm);
            if (errors.Count > 0)
            {
                return ToJson(HttpStatusCode.BadRequest, new { errors });
            }
            
            await SendContactEmail(contactForm!, context);
            
            return Ok("Mensagem recebida. Obrigado!");
        }
        catch (Exception e)
        {
            context.Logger.LogLine($"Erro: {e.Message}");
            
            return ToJson(HttpStatusCode.InternalServerError, new
            {
                message = "Não foi possível enviar a mensagem. Por favor, tente novamente mais tarde."
            });
        }
    }
    
    private static APIGatewayProxyResponse Ok(string message) 
        => ToJson(HttpStatusCode.OK, new { message });

    private static APIGatewayProxyResponse ToJson(HttpStatusCode statusCode, object body)
    {
        var json = JsonSerializer.Serialize(body);
        
        return new APIGatewayProxyResponse
        {
            StatusCode = (int)statusCode,
            Headers = new Dictionary<string, string>
            {
                { "Access-Control-Allow-Origin", "https://pedrolucas.dev.br" },
                { "Access-Control-Allow-Methods", "OPTIONS,POST" },
                { "Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token" }
            },
            Body = json
        };
    }
    
    private static async Task SendContactEmail (ContactRequest contactForm, ILambdaContext context)
    {
        var from = Environment.GetEnvironmentVariable("SES_FROM_ADDRESS") ?? "";
        var to = Environment.GetEnvironmentVariable("SES_TO_ADDRESS") ?? "";

        await Ses.SendEmailAsync(new SendEmailRequest
        {
            FromEmailAddress = from,
            Destination = new Destination
            {
                ToAddresses = new List<string> { to }
            },
            Content = new EmailContent
            {
                Simple = new Message
                {
                    Subject = new Content { Data = $"Contato do portfólio: {contactForm.Name}" },
                    Body = new Body
                    {
                        Text = new Content
                        {
                            Data = $"De {contactForm.Email}\n\n{contactForm.Message}"
                        }
                    }
                }
            }
        });
    }
}