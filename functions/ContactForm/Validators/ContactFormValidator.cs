using ContactForm.Models;

namespace ContactForm.Validators;

public static class ContactFormValidator
{
    public static List<string> Validate(ContactRequest? request)
    {
        var errors = new List<string>();
        
        var name = request?.Name?.Trim();
        if (string.IsNullOrEmpty(name))
        {
            errors.Add("nome é obrigatório");
        }
        else if (name.Length > 120)
        {
            errors.Add("o nome não pode ser maior que 120 caracteres");
        }

        if (string.IsNullOrEmpty(request?.Email))
        {
            errors.Add("email é obrigatório");
        }
        else if (!EmailValidator.IsValidEmail(request.Email))
        {
            errors.Add("email inválido");
        }

        var message = request?.Message?.Trim();
        if (string.IsNullOrEmpty(message))
        {
            errors.Add("mensagem é obrigatória");
        }
        else if (message.Length > 5000)
        {
            errors.Add("a mensagem não pode ter mais de 5000 caracteres");
        }
        
        return errors;
    }
}