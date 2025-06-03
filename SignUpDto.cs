public class SignUpDto
{
    // user_account
    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    // user_profile
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    public DateTime Dob { get; set; }

    [Required]
    public string Number { get; set; }

    public string Blood { get; set; }

    public string Gender { get; set; }

    public int Age { get; set; }

    public string DiseaseDescription { get; set; }
}
