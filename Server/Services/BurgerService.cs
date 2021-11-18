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

        public async Task<List<BurgerComponent>> GetbyId(Guid? id)
        {
            List<BurgerComponent> burgerComponents;
            List<Component> components;
            try
            {
                burgerComponents = await context.BurgersComponents.Where(b => b.BurgerId == id).OrderBy(b => b.SerialNumber).Include(b => b.Component).ToListAsync();
                //burger = await context.Burgers.Inc
                //Burgers.Include(b => b.Components).SingleAsync(b => b.Id == id);
            }
            catch(Exception e)
            {
                return null;
            }
            return burgerComponents;
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
