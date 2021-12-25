using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services {
    public class ComponentService {

        private StackBurgerContext Context { get; }
        public ComponentService(StackBurgerContext context) =>
            Context = context;        

        public async Task<ReturnModel<object>> GetComponents() {
            List<Component> components = null;
            try {
                components = await Context.Components
                    .Include(c => c.Category)
                    .AsNoTracking()
                    .AsSplitQuery()
                    .ToListAsync();
            } catch {
                return new ReturnModel<object>(null, 500, "Internal Server Error");
            }
            var result = components
                .Select(c => new {
                    Key = c.Category.Name,
                    Value = new {
                        Id = c.Id,
                        Name = c.Name,
                        Url = c.Url,
                        Price = c.Price,
                        Calories = c.Calories,
                        Weight = c.Weight
                    }
                })
                .OrderBy(c => c.Value.Name)
                .ToLookup(c => c.Key, c => c.Value)
                .ToDictionary(c => c.Key, c => c);

            return new ReturnModel<object>(result, 200, "All components returned");
        }
    }
}
