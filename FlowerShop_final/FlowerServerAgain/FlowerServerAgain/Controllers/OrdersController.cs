using FlowerServerAgain.Data;
using FlowerServerAgain.Models;
using FlowerServerAgain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static NuGet.Packaging.PackagingConstants;

namespace FlowerServerAgain.Controllers
{
    public class OrdersController : Controller
    {
        private readonly ApplicationDbContext _context;
        private UserManager<User> _userManager;

        public OrdersController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: Orders
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Orders.Include(o => o.User).OrderBy(k => k.DeliverDate);
            var currentOrder = await applicationDbContext.Where(c => c.Delivered == false).ToListAsync();
            var deliveredOrder = await applicationDbContext.Where(c => c.Delivered == true).ToListAsync();
            return Ok(new {message = "Данные для администатора готовы", current = currentOrder, delivered=deliveredOrder});
        }
        [Authorize]
        public async Task<IActionResult> AllMyOrder()
        {
            var Userid = _userManager.GetUserId(User);
            if (Userid == null)
            {
                return NotFound();
            }
            var myOrdering = _context.Orders.Where(c => c.User.Id == Userid).ToList();
            if (myOrdering == null)
            {
                return Ok();
            }
            var orderIds = myOrdering.Select(y => y.Id).ToList(); 
            var items  = _context.Items.Where(c => orderIds.Contains(c.OrdersId)).ToList();
            ViewBag.Products = _context.Products.ToList();
            var viewOrders = myOrdering.Select(c => new OrderWithItems
            {
                items = items.Where(y => y.OrdersId == c.Id).ToList(),
                Id = c.Id,
                Address = c.Address,
                DeliverDate = c.DeliverDate,
                OrderDate = c.OrderDate,
                Delivered = c.Delivered,
                Summa = c.Summa
            });

            return Ok(new { message = "Ваши заказы", todos = viewOrders});

        }
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult<OrderWithItems>> Details(int? id)
        {

            if (id == null)
            {
                return NotFound();
            }

            var order = await _context.Orders
               .FirstOrDefaultAsync(m => m.Id == id);

            if (order == null)
            {
                return View();
            }
            var items = _context.Items.Where(c => c.OrdersId == id).ToList();
            ViewBag.Products = _context.Products.ToList();
            var viewOrders = new OrderWithItems
            {
                items = items.Where(y => y.OrdersId == id).ToList(),
                Id = order.Id,
                Address = order.Address,
                DeliverDate = order.DeliverDate,
                OrderDate = order.OrderDate,
                Delivered = order.Delivered,
                Summa = order.Summa
            };
          
            return viewOrders;
           
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OrderModel orderModel)
        {
            var userId = _userManager.GetUserId(User);

            if (ModelState.IsValid)
            {
                Order orders = new Order();
                orders.OrderDate = DateTime.Now;
                orders.Address = orderModel.Address;
                orders.DeliverDate = orderModel.DeliverDate;
                orders.UserId = userId;
                orders.Delivered = false;
                var u = _context.Carts.Where(m => m.UserId == userId).Select(m => m.Product.Cost * m.CountPr).Sum();
                orders.Summa = u;
                _context.Add(orders);


                await _context.SaveChangesAsync();
                var d = _context.Carts.Where(m => m.UserId == userId);


                foreach (var cartItem in d)
                {

                    var item = new OrderItem();
                    item.ProductId = cartItem.ProductId;
                    item.CountPr = cartItem.CountPr;
                    item.OrdersId = orders.Id;
                    _context.Add(item);
                    _context.Remove(cartItem);
                }
                await _context.SaveChangesAsync();
                return Ok(new {message ="Ваш заказ добавлен"});

            }
            return Ok();

        }
        

        // POST: Categories/Delete/5
        [Authorize(Roles = "Administrator")]
        [HttpPost, ActionName("Cancel")]
        public async Task<IActionResult> CancelConfirmed(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {

                _context.Items.Where(m => m.OrdersId == id).ExecuteDelete();
                _context.Orders.Remove(order);
            }

            await _context.SaveChangesAsync();
            return Ok();
                
        }

        // POST: Categories/Delete/5
        [Authorize(Roles = "Administrator")]
        [HttpPost, ActionName("Confirm")]
        public async Task<IActionResult> OrderConfirmed(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {


                order.Delivered = true;

                _context.Update(order);
                await _context.SaveChangesAsync();


            }

            return Ok();
                
        }

    }
}
