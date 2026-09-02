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
        public async Task<IActionResult> Create([FromBody] CartModel cartModel)
        {

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
            }
            return Ok();
        }

        private JsonResult returnCount(Cart cart)
        {
            var dataq = new { Count = cart.CountPr };
            return Json(dataq);
        }


        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.Id == id);
        }
     
    }
}
