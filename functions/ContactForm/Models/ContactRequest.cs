using System.Text.Json.Serialization;

namespace ContactForm.Models;

public sealed record ContactRequest()
{
    [JsonPropertyName("nome")]
    public string? Name { get; init; }
    [JsonPropertyName("email")]
    public string? Email { get; init; }
    [JsonPropertyName("mensagem")]
    public string? Message { get; init; }
    [JsonPropertyName("website")]
    public string? Website { get; init; }
}