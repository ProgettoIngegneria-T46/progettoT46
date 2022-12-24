export class Product {
    id: string = "";
    name: string = "";
    price: number = 0;
    description: string = "";
    // styles: string[] = [];

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.description = product.description;
        // this.styles = product.styles;
    }
}

export class Course {
    id: string = "";
    name: string = "";
    price: number = 0;
    description: string = "";

    constructor(course: Course) {
        this.id = course.id;
        this.name = course.name;
        this.price = course.price;
        this.description = course.description;
    }
}

export class Membership {
    id: string = "";
    name: string = "";
    price: number = 0;
    description: string = "";

    constructor(membership: Membership) {
        this.id = membership.id;
        this.name = membership.name;
        this.price = membership.price;
        this.description = membership.description;
    }
}