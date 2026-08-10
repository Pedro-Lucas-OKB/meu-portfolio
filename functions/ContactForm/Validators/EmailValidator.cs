using System.Net.Mail;

namespace ContactForm.Validators;

public static class EmailValidator
{
    public static bool IsValidEmail(string email)
    {
        var trimmedEmail = email.Trim();

        if (trimmedEmail.Length > 254)
        {
            return false;
        }

        if (trimmedEmail.EndsWith('.')) {
            return false;
        }

        if (trimmedEmail.Contains(' ') || trimmedEmail.Contains('\t') || trimmedEmail.Contains('\n'))
        {
            return false;      
        }

        if (!trimmedEmail.Contains('@'))
        {
            return false;
        }

        var atIndex = trimmedEmail.IndexOf('@');
        if (trimmedEmail.IndexOf('@', atIndex + 1) >= 0)
        {
            return false;
        }

        var domain = trimmedEmail.Substring(atIndex + 1);
        if (domain.Length == 0 || !domain.Contains('.'))
        {
            return false;
        }

        if (trimmedEmail.Contains(".@") || trimmedEmail.Contains("@."))
        {
            return false;      
        }
        
        var splitedEmail = trimmedEmail.Split('.');
        if (splitedEmail.Any(x => x == string.Empty)) // pontos seguidos
        {
            return false;      
        }
        
        try {
            var addr = new MailAddress(trimmedEmail);

            return addr.User.Length <= 64 && addr.Host.Length <= 255;
        }
        catch (FormatException) {
            return false;
        }
    }
}