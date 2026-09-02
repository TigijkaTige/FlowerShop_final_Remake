using FlowerServerAgain.Data;
using FlowerServerAgain.Models;
using FlowerServerAgain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Threading.Tasks;

namespace FlowerServerAgain.Controllers
{
    public class CartsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private UserManager<User> _userManager;

        public CartsController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: Carts
        [Authorize]
        public async Task<IActionResult> Index()
        {
            //var applicationDbContext = _context.Carts.Include(c => c.Product).Include(c => c.User);
            //return View(await applicationDbContext.ToListAsync());
            var Userid = _userManager.GetUserId(User);
            if (Userid == null)
            {
                return NotFound();
            }
            var myCart = _context.Carts.Where(c => c.User.Id == Userid);
            if (myCart == null)
            {
                return Ok();
            }
            ViewBag.Products = _context.Products.ToList();

            var u = _context.Carts.Where(m => m.UserId == Userid).Select(m => m.Product.Cost * m.CountPr).Sum();
            return Ok(new {message ="Корзина пользователя получена", todos = myCart , summa = u});
        }


    
        [Authorize]
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromBody] CartModel cartModel)
        {

            //int productId = cartModel.productId;
            //int CountPr = cartModel.CountPr;
            if (ModelState.IsValid)
            {
                var userId = _userManager.GetUserId(User);
                var d = _context.Carts.Where(m => m.Product.Id == cartModel.productId && m.UserId == userId);
                if (!d.IsNullOrEmpty())
                {
                    var cart1 = d.First();
                    cart1.CountPr += cartModel.CountPr;
                    if(cart1.CountPr <= 0)
                    {
                        _context.Carts.Remove(cart1);   
                    }
                    else
                    {
                        _context.Update(cart1);
                    }                 
                    await _context.SaveChangesAsync();
                    var u = _context.Carts.Where(m => m.UserId == userId).Select(m => m.Product.Cost * m.CountPr).Sum();
                    var myCart = _context.Carts.Where(c => c.User.Id == userId);
                    ViewBag.Products = _context.Products.ToList();
                    return Ok(new { message = "Корзина пользователя получена", todos = myCart, summa = u });

                }

                Cart cart = new Cart();

                cart.Product = _context.Products.Find(cartModel.productId);
                cart.CountPr = cartModel.CountPr;
                cart.UserId = userId;
                _context.Add(cart);

                await _context.SaveChangesAsync();
                return Ok();
                    //RedirectToAction(nameof(Index));
            }
            //ViewBag.Products = _context.Products;
            return Ok();
        }

        private JsonResult returnCount(Cart cart)
        {
            var dataq = new { Count = cart.CountPr };
            return Json(dataq);
        }

        //[Authorize]
        //[HttpPost]
        ////[ValidateAntiForgeryToken]
        ////Считает сумму? Я не помню зачем она? она же просто повторяет add\create, но сложнее и возращает json... 
        ////думаю надо просто их соединить...
        //public async Task<JsonResult> IntCount(int productId, int CountPr)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var userId = _userManager.GetUserId(User);
        //        var d = _context.Carts.Where(m => m.Product.Id == productId && m.UserId == userId);
        //        if (!d.IsNullOrEmpty())
        //        {
        //            var cart1 = d.First();

        //            if (cart1.CountPr <= 1 && CountPr < 0)
        //            {
        //                return returnCount(cart1);

        //            }
        //            cart1.CountPr += CountPr;
        //            _context.Update(cart1);
        //            await _context.SaveChangesAsync();
        //            return returnCount(cart1);
        //            //return Ok();

        //        }

        //        Cart cart = new Cart();

        //        cart.Product = _context.Products.Find(productId);
        //        cart.CountPr = CountPr;
        //        cart.UserId = userId;
        //        _context.Add(cart);

        //        await _context.SaveChangesAsync();
        //        //var data = new { Name = "John Doe", Age = 30 };
        //        return returnCount(cart);
        //        //return RedirectToAction(nameof(Index));
        //    }
        //    //ViewBag.Products = _context.Products;
        //    //return View();
        //    return Json(null);
        //}

        // GET: Carts/Delete/5
        //public async Task<IActionResult> Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var cart = await _context.Carts
        //        //.Include(c => c.Product)
        //        //.Include(c => c.User)
        //        .FirstOrDefaultAsync(m => m.Id == id);
        //    if (cart == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(cart);
        //}

        // POST: Carts/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[Authorize]
        ////[ValidateAntiForgeryToken]
        //public async Task<IActionResult> DeleteConfirmed(int id)
        //{
        //    var cart = await _context.Carts.FindAsync(id);
        //    if (cart != null)
        //    {
        //        _context.Carts.Remove(cart);
        //    }

        //    await _context.SaveChangesAsync();
        //    return Ok();
        //    //RedirectToAction(nameof(Index));
        //}

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.Id == id);
        }
     
    }
}
