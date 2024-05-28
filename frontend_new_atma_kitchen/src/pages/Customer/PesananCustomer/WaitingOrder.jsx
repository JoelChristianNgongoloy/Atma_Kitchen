import React, { useState, useEffect } from "react";
import { Spinner, Card, CardBody } from "@material-tailwind/react";
import { GetMyPesanan, GetPesanan } from "../../../api/CustomerApi/apiPesanan";
import KirimBukti from "./KirimBukti";

const WaitingOrder = () => {
  const [isPending, setIsPending] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    setIsPending(true);
    GetPesanan()
      .then((data) => {
        setOrders(data);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDetailClick = (orderId) => {
    console.log("Order detail clicked for order ID:", orderId);
  };

  return (
    <div className="p-5">
      <h1 className="font-bold text-6xl text-black mb-2">Pesanan</h1>
      <hr className="border-r-4 border-gray-600 mb-5" />
      {isPending ? (
        <div className="flex justify-center mb-2">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="font-bold text-3xl text-black mb-2">Lunas</h2>
            {orders
              .filter((order) => order.status_pesanan === "Lunas")
              .map((order) => (
                <div key={order.id_pesanan} className="mb-4">
                  <Card className="mt-4 bg-green-100">
                    <CardBody>
                      <h2 className="font-bold text-xl text-black mb-2">Tanggal Pesan: {order.tanggal_pesan}</h2>
                      <p className="text-black">Jumlah Barang: {order.jumlah_produk}</p>
                      <p className="text-black">Total: Rp {order.total_harga}</p>
                      <button
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-600"
                        onClick={() => handleDetailClick(order.id_pesanan)}
                      >
                        Detail
                      </button>
                    </CardBody>
                  </Card>
                </div>
              ))}
          </div>
          <div>
            <h2 className="font-bold text-3xl text-black mb-2">Belum Lunas</h2>
            {orders
              .filter((order) => order.status_pesanan !== "Lunas")
              .map((order) => (
                <div key={order.id_pesanan} className="mb-4">
                  <Card className="mt-4 bg-red-100">
                    <CardBody>
                      <h2 className="font-bold text-xl text-black mb-2">Tanggal Pesan: {order.tanggal_pesan}</h2>
                      <p className="text-black">Jumlah Barang: {order.jumlah_produk}</p>
                      <p className="text-black">Total: Rp {order.total_harga}</p>
                      <button
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-600"
                        onClick={() => handleDetailClick(order.id_pesanan)}
                      >
                        Detail
                      </button>
                      <KirimBukti pesanan={order} />
                    </CardBody>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitingOrder;
