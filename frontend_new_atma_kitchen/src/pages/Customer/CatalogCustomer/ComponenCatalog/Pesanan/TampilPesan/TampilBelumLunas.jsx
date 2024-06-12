import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { GetMyDetailPesanan } from "../../../../../../api/CustomerApi/Pesanan/PesananApi";
import { useNavigate } from "react-router-dom";
import { getFotoProduk } from "../../../../../../api";

const TampilBelumLunas = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pesanan, setPesanan] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    GetMyDetailPesanan()
      .then((data) => {
        console.log("Pesanan Data:", data);
        const pendingPesanan = data.filter(
          (item) =>
            item.status_pesanan === "Belum Lunas"
        );
        setPesanan(pendingPesanan);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center ">
          <div className="">
            <Spinner />
            <h6 className="mt-2 mb-0">Loading...</h6>
          </div>
        </div>
      ) : pesanan?.length > 0 ? (
        <>
          {pesanan?.length > 0 ? (
            <>
              {pesanan.map((pesananItem, index) => (
                <div
                  key={index}
                  className="border border-slate-700 shadow-lg rounded-md px-10 mb-6 cursor-pointer"
                  onClick={() => navigate(`/detail_pesanAll/${pesananItem.id}`)}
                >
                  <div className="w-full flex justify-between">
                    <div></div>
                    <h2 className="font-bold">{pesananItem.status_pesanan}</h2>
                  </div>
                  <div className="">
                    <ul>
                      {pesananItem.detail_pesanan?.map(
                        (detailItem, detailIndex) => (
                          <div
                            className="border border-gray-200 shadow-lg rounded-md mb-6 flex items-center"
                            key={detailIndex}
                          >
                            <div className="w-24 h-24 relative mr-6">
                              <img
                                className="w-full h-full rounded-md object-cover"
                                src={getFotoProduk(
                                  detailItem.produk?.foto_produk
                                )}
                                alt="Produk"
                              />
                            </div>
                            <div className="flex flex-col justify-between w-full">
                              <div>
                                <h2 className="text-lg font-bold mb-2">
                                  {detailItem.produk?.nama_produk}
                                </h2>
                                <div className="flex justify-between">
                                  <p className="text-gray-600">
                                    X{detailItem.jmlh_produk}
                                  </p>

                                  <p className="text-gray-600">
                                    {detailItem.produk?.harga_produk.toLocaleString(
                                      "id-ID",
                                      {
                                        style: "currency",
                                        currency: "IDR",
                                      }
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="flex justify-between">
                    <div></div>
                    <div>
                      <h2 className="text-lg font-bold mb-2">
                        Total Pesanan:{" "}
                        {pesananItem.total_harga.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div>Kosong</div>
          )}
        </>
      ) : (
        <div className="border border-slate-700 shadow-lg rounded-md px-10 mb-6 text-center">
          <h2>Kosong</h2>
        </div>
      )}
    </div>
  );
};

export default TampilBelumLunas;
