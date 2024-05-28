import React from 'react';
import {
  Card,
  CardBody,
} from "@material-tailwind/react";

const Contact = () => {
  return (
    <div className="w-full h-full flex justify-center mt-32">
      <div className="w-full h-full flex justify-center items-center mt-64">
        <Card className="w-full max-w-md border" color="white">
          <CardBody className="flex flex-col gap-2 items-center">
            <h2 className='text-lg lg:text-xl xl:text-2xl'>Contact Info!</h2>
            <p>For further question and feed back, contact us from:</p>
            <ul>
              <li>Email: info@atmakitchen.com</li>
              <li>Telepon: 123-456-789</li>
              <li>Alamat: Jl. Contoh No. 123, Kota Anda</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Contact;
