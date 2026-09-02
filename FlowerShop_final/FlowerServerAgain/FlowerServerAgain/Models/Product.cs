namespace FlowerServerAgain.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double Cost { get; set; }
        //public string? FileName { get; set; } А зачем?
        //public byte[]? Picture { get; set; }
        public string? ImagePath { get; set; }
        public string? Description { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}
