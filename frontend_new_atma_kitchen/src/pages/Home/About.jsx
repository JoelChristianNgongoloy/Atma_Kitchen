import React from 'react';
import {
  Card,
  CardBody,
} from "@material-tailwind/react";

const About = () => {
  return (
    <div className="w-full h-full flex justify-center items-center mt-32">
      <Card className="w-full max-w-xl border" color="white">
        <CardBody className="flex flex-col gap-4 items-center">
          <h2 className='text-lg lg:text-xl xl:text-2xl'>Tentang Kami</h2>
          <p>Atma Kitchen adalah tempat di mana kami menciptakan dan menghadirkan berbagai kue dan cemilan lezat untuk Anda nikmati. Dengan bahan-bahan berkualitas dan resep tradisional, kami berkomitmen untuk memberikan pengalaman kuliner yang memuaskan bagi pelanggan kami.</p>
        </CardBody>
      </Card>
    </div>
  );
}

export default About;
