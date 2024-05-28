import React from 'react';
import {
  Card,
  CardBody,
} from "@material-tailwind/react";

const Home = () => {
  const greetings = [
    "Selamat datang di Atma Kitchen!",
    "Halo, selamat datang di Atma Kitchen!",
    "Salam hangat dari Atma Kitchen!",
    "Mari nikmati kelezatan di Atma Kitchen!",
  ];

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  return (
    <div className="w-full h-full flex justify-center mt-32">
        <div className="w-full h-full flex justify-center items-center mt-64">
            <Card className="w-full max-w-xl border" color="white">
                <CardBody className="flex flex-col gap-2 items-center">
                    <p className="absolute animate-wave text-6xl top-2 transform -translate-x-1/2" role="img" aria-label="Waving hand">👋</p>
                    <br />
                    <br />
                    <h1>{randomGreeting}</h1>
                    <p>Website kami menyediakan berbagai kue dan cemilan lezat.</p>
                </CardBody>
            </Card>
        </div>
    </div>
  );
}

export default Home;
