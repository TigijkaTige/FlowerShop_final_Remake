using FlowerServerAgain.Data;
using FlowerServerAgain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Threading.Tasks;


namespace FlowerServerAgain.Controllers
{
    public class ProductsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Products
        public async Task<ActionResult<IEnumerable<Product>>> Index()
        {
            var applicationDbContext = _context.Products.Include(p => p.Category);
            return await applicationDbContext.ToListAsync();
        }

        // GET: Products/Details/5
        public async Task<ActionResult<Product>> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var product = await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            return product;
        }


        // GET: Products/Create
        //public IActionResult Create()
        //{
        //    ViewData["CategoryId"] = new SelectList(_context.Categories, "Id", "Id");
        //    return View();
        //}

        // POST: Products/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult<Product>> Create([FromForm] Product product, IFormFile Picture)//[Bind("Id,Title,Cost,ImagePath,Description,CategoryId")] 
        {
            if (ModelState.IsValid)
            {
                if(Picture!=null)
                {
                    product.ImagePath = "Image\\" + Picture.FileName;
                    using (var memoryStream = new MemoryStream())
                    {
                        await Picture.CopyToAsync(memoryStream);
                        var im = Image.FromStream(memoryStream);
                        im.Save(product.ImagePath);

                    }
                }
      
                _context.Add(product);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            //ViewData["CategoryId"] = new SelectList(_context.Categories, "Id", "Id", product.CategoryId);
            return product;
        }

   

        // POST: Products/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult<Product>> Edit(int id,[FromForm] Product product, IFormFile Picture)//[Bind("Id,Title,Cost,ImagePath,Description,CategoryId")]
        {
            if (id != product.Id)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            //{
                try
                {
                    if (Picture != null)
                    {
                        product.ImagePath = "Image\\" + Picture.FileName;
                        using (var memoryStream = new MemoryStream())
                        {
                            await Picture.CopyToAsync(memoryStream);
                            var im = Image.FromStream(memoryStream);
                            im.Save(product.ImagePath);

                        }
                    }
                else
                {
                    var productBack = await _context.Products
                .Include(p => p.Category).AsNoTracking()
                .FirstOrDefaultAsync(m => m.Id == id);
                    product.ImagePath= productBack?.ImagePath;
        
                }
                    _context.Update(product);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProductExists(product.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return product;
            //}
            //ViewData["CategoryId"] = new SelectList(_context.Categories, "Id", "Id", product.CategoryId);
            //return product;
        }


        // POST: Products/Delete/5
        [HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }

        public async Task<IActionResult> Picture(int? id, int x, int y)
        {
            if (id == null)
            {
                return NotFound();
            }
            // Construct absolute image path
            //var imagePath = "whatever";
            var product = await _context.Products
               .FirstOrDefaultAsync(m => m.Id == id);
            if (product.ImagePath == null || product.ImagePath == "")
            {
                return NotFound();
            }
            var im = Image.FromFile(product.ImagePath);
            Bitmap newImage = new Bitmap(im, new Size(x, y));                    
            MemoryStream memory = new MemoryStream();

            //im.Save(memory, new Aspose.Imaging.ImageOptions.JpegOptions()); Этот Аспоре при выводе водяной знак делал
            newImage.Save(memory, ImageFormat.Jpeg);
            if (product == null)
            {
                return NotFound();
            }
            return base.File(memory.ToArray(), "image/jpg");
        }
    }
}
