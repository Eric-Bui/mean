import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(products: any, name: String, categorySelected: String): any {
    if (!name && !categorySelected) {
      return products;
    } else {
      if (name) {
        products = products.filter((x) => {
          return x.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
        });
      }
      if (categorySelected && categorySelected != "undefined") {
        products = products.filter((x) => {
          return x.idCat == categorySelected;
        });
      }
    }
    return products;
  }
}
