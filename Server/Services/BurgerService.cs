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

        public async Task<object> GetBurgers() {
            List<Burger> burgers = new List<Burger>();
            try
            {
                List<Guid> ids = await Context.Burgers.Select(b => b.Id).ToListAsync();
                foreach (Guid id in ids)
                    burgers.Add(await GetBurgerById(id));
            }
            catch
            {
                return null;
            }
            var result = burgers.Select(b => new {
                Id = b.Id,
                Name = b.Name, 
                Descripton = b.Description,
                Components = b.Components.Select(c => c.Name).ToList(),
                Price = b.Components.Sum(c => c.Price),
                Calories = b.Components.Sum(c => c.Calories)
            });
            return result;
        }

        public async Task<Burger> GetBurgerById(Guid? id) {
            Burger burger;
            try
            {
                burger = await Context.Burgers.
                    SingleAsync(b => b.Id == id);
                List<Component> components = await Context.BurgersComponents
                    .Where(bc => bc.BurgerId == id)
                    .OrderBy(bc => bc.SerialNumber)
                    .Select(bc => Context.Components
                        .Single(c => c.Id == bc.ComponentId))
                    .ToListAsync();
                burger.Components = components;
            }
            catch
            {
                return null;
            }
            return burger;
        }        
    }
}
