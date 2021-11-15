using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using Server.Models;

namespace Server.Services
{
    public class BurgerService
    {
        private StackBurgerContext context;

        public BurgerService(StackBurgerContext _context)
        {
            
            context = _context;
        }

        public async Task<BurgerComponent> GetbyId(Guid? id)
        {
            BurgerComponent burger;
            try
            {
                burger = await context.BurgersComponents.SingleAsync(b => b.BurgerId == id);
                //burger = await context.Burgers.Inc
                //Burgers.Include(b => b.Components).SingleAsync(b => b.Id == id);
            }
            catch
            {
                return null;
            }
            return burger;
        }

        
        public async Task<List<Burger>> Get()
        {
            List<Burger> burgers = null;
            try
            {
                 burgers = await context.Burgers.Where(b => b.IsCustom).ToListAsync();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return burgers;
        }

        public bool Add(Burger burger)
        {
            try
            {
                context.Add(burger);
                context.SaveChanges();
            }
            catch
            {
                return false;
            }
            return true;
        }

        public bool Edit(Burger burger)
        {
            try
            {
                context.ChangeTracker.Clear();
                context.Burgers.Update(burger);
                context.SaveChanges();
            }
            catch
            {
                return false;
            }
            return true;
        }

        public bool Delete(Guid id)
        {
            /*try
            {
                context.ChangeTracker.Clear();
                context.Burgers.Remove(GetbyId(id));
                context.SaveChanges();
            }
            catch
            {
                return false;
            }*/
            return true;
        }
    }
}
