import React from 'react';
import {
  Card,
  CardBody,
} from "@material-tailwind/react";

const Product = () => {
  return (
    <div>
        <div className="w-full h-full flex justify-center mt-10">
            <div className="w-full h-full flex justify-center items-center">
                <Card className="w-full max-w-md border" color="white">
                    <CardBody className="flex flex-col gap-2 items-center">
                        <p className="absolute text-6xl top-2 transform">Produk</p>
                        <br />
                    </CardBody>
                </Card>
            </div>
        </div>

      <h3 className='mt-10 text-lg lg:text-xl xl:text-2xl'>Kue</h3>
      <div className="grid grid-cols-3 gap-4">
        <Card color="white">
          <CardBody>
            <h4>Lapis Legit</h4>
            <p>Per Loyang (uk.20x20): 850.000</p>
            <p>Per ½ Loyang (uk.10x20): 450.000</p>
          </CardBody>
        </Card>
        <Card color="white">
          <CardBody>
            <h4>Lapis Surabaya</h4>
            <p>Per Loyang (uk.20x20): 550.000</p>
            <p>Per ½ Loyang (uk.10x20): 300.000</p>
          </CardBody>
        </Card>
        <Card color="white">
          <CardBody>
            <h4>Brownies</h4>
            <p>Per Loyang (uk.20x20): 250.000</p>
            <p>Per ½ Loyang (uk.10x20): 150.000</p>
          </CardBody>
        </Card>
        <Card color="white">
          <CardBody>
            <h4>Mandarin</h4>
            <p>Per Loyang (uk.20x20): 450.000</p>
            <p>Per ½ Loyang (uk.10x20): 250.000</p>
          </CardBody>
        </Card>
        <Card color="white">
          <CardBody>
            <h4>Spikoe</h4>
            <p>Per Loyang (uk.20x20): 350.000</p>
            <p>Per ½ Loyang (uk.10x20): 200.000</p>
          </CardBody>
        </Card>
      </div>

      <h3 className='mt-10 text-lg lg:text-xl xl:text-2xl'>Roti</h3>
      <div className="grid grid-cols-3 gap-4">
        <Card color="white">
          <CardBody>
            <h4>Roti Sosis</h4>
            <p>Per Box (isi 10): 180.000</p>
          </CardBody>
        </Card>
        <Card color="white">
          <CardBody>
            <h4>Milk Bun</h4>
            <p>Per Box (isi 10): 120.000</p>
          </CardBody>
        </Card>
        <Card color="white">
          <CardBody>
            <h4>Roti Keju</h4>
            <p>Per Box (isi 10): 150.000</p>
          </CardBody>
        </Card>
      </div>

      <h3 className='mt-10 text-lg lg:text-xl xl:text-2xl'>Minuman</h3>
      <div className="grid grid-cols-3 gap-4">
        <Card color="white">
          <CardBody>
            <h4>Choco Creamy Latte</h4>
            <p>Per Liter: 75.000</p>
          </CardBody>
        </Card>
        <Card color="white">
          <CardBody>
            <h4>Matcha Creamy Latte</h4>
            <p>Per Liter: 100.000</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Product;
