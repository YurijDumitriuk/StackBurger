using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services {
    public class BurgerService {

        private StackBurgerContext Context { get; }
        public BurgerService(StackBurgerContext context) {
            Context = context;
        }

        public async Task<List<Burger>> GetBurgers() {
            List<Burger> burgers = await Context.Burgers.ToListAsync();
            return burgers;
        }

        public async Task<Burger> GetBurgerById(Guid? id) {
            Burger burger = await Context.Burgers.
                SingleAsync(b => b.Id == id);
            List<Component> components = await Context.BurgersComponents
                .Where(bc => bc.BurgerId == id)
                .OrderBy(bc => bc.SerialNumber)
                .Select(bc => Context.Components.Single(c => c.Id == bc.ComponentId))
                .ToListAsync();
            burger.Components = components;
            return burger;
        }        
    }
}
