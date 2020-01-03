import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './models/product.model';
import { ProductsGateway } from './gateway/products.gateway'

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>, private gate: ProductsGateway) { }

    async addProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({ title, description: desc, price });
        const result = await newProduct.save();
        const boh = {
            id: result._id,
            title: result.title,
            description: result.description,
            price: result.price
        }
        this.gate.productCreated(boh);
        return boh;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map(prod => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price
        }));
    }

    async getSingleProduct(prodId: string) {
        const product = await this.findProduct(prodId);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        };
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(productId);
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        updatedProduct.save();
    }

    async deleteProduct(prodId: string) {
        const result = await this.productModel.deleteOne({ _id: prodId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Impossibiler elliminare il prodotto. Il prodotto non esiste');
        }
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Impossibiler trovare il prodotto.');
        }
        if (!product) {
            throw new NotFoundException('Impossibiler trovare il prodotto.');
        }

        return product;
    }

}
