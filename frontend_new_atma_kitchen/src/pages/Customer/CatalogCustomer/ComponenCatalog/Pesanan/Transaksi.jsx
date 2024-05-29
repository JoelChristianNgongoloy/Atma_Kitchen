import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { GetTransaksi } from "../../../../../api/CustomerApi/Pesanan/PesananApi";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const Transaksi = () => {
  const { id } = useParams();
  const [trans, setTrans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchTrans = async () => {
    setLoading(true);
    try {
      const data = await GetTransaksi(id);
      console.log(data); // Tambahkan ini untuk memeriksa struktur data
      setTrans(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrans();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-96">
        <div className="flex justify-center">
          <Spinner />
        </div>
        <h6 className="mt-2 mb-0">Loading...</h6>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!trans || trans.length === 0) {
    return <div className="text-center">Data Transaksi tidak tersedia.</div>;
  }

  // Mengelompokkan transaksi berdasarkan id_pesanan
  const groupedTransactions = trans.reduce((acc, curr) => {
    const idPesanan = curr.id_pesanan;
    const existingGroup = acc.find((group) => group.idPesanan === idPesanan);

    if (existingGroup) {
      existingGroup.transactions.push(curr);
    } else {
      acc.push({ idPesanan, transactions: [curr] });
    }
 
    return acc;
  }, []);

  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    section: {
      marginBottom: 10,
      padding: 10,
      border: "1px solid #000",
      borderRadius: 5,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      padding: 5,
      border: "1px solid #000",
    },
    header: {
      textAlign: "center",
      marginBottom: 10,
      fontSize: 24,
      fontWeight: "bold",
    },
    textCenter: {
      textAlign: "center",
    },
  });

  const generatePDFDocument = () => {
    const doc = (
      <Document>
        {groupedTransactions.map((group, index) => (
          <Page key={index} style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.header}>Nota</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>No Nota</Text>
                  <Text style={styles.tableCell}>
                    {group.transactions[0].no_nota}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Tanggal Pesan</Text>
                  <Text style={styles.tableCell}>
                    {group.transactions[0].tanggal_transaksi}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Customer</Text>
                  <Text style={styles.tableCell}>
                    {group.transactions[0].pesanan.customer.email}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.table}>
                {group.transactions.map((transaction, transactionIndex) => (
                  <View key={transactionIndex} style={styles.tableRow}>
                    <Text style={styles.tableCell}>
                      {transaction.produk.nama_produk}
                    </Text>
                    <Text style={styles.tableCell}>
                      {transaction.produk.harga_produk.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Total</Text>
                  <Text style={styles.tableCell}>
                    {group.transactions[0].pesanan.total_harga.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Tanggal Pesan</Text>
                  <Text style={styles.tableCell}>
                    {group.transactions[0].tanggal_transaksi}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Customer</Text>
                  <Text style={styles.tableCell}>
                    {group.transactions[0].pesanan.customer.email}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Poin yang didapatkan</Text>
                  <Text style={styles.tableCell}>
                    {group.transactions[0].poin_didapatkan}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Poin Sekarang</Text>
                  <Text style={styles.tableCell}>
                    {group.transactions[0].poin_now}
                  </Text>
                </View>
              </View>
            </View>
          </Page>
        ))}
      </Document>
    );

    pdf(doc)
      .toBlob()
      .then((blob) => {
        saveAs(blob, `Nota_Transaksi_${id}.pdf`);
      });
  };

  return (
    <div>
      {/* Menampilkan setiap kelompok transaksi */}
      {groupedTransactions.map((group, index) => (
        <div key={index}>
          {/* Menampilkan informasi umum transaksi */}
          <div className="border border-slate-700 shadow-lg rounded-md py-12 px-64 mb-2">
            <div className="text-center mb-5">
              <h1 className="font-bold text-2xl mb-4">Nota</h1>
            </div>
            <table className="table" style={{ borderSpacing: "0 15px" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "10px 15px" }}>No Nota</td>
                  <td style={{ padding: "10px 15px" }}>
                    {group.transactions[0].no_nota}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 15px" }}>Tanggal Pesan</td>
                  <td style={{ padding: "10px 15px" }}>
                    {group.transactions[0].tanggal_transaksi}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 15px" }}>Customer</td>
                  <td style={{ padding: "10px 15px" }}>
                    {group.transactions[0].pesanan.customer.email}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Menampilkan produk dari setiap transaksi */}
          <div className="border border-slate-700 shadow-lg rounded-md py-12 px-64 mb-2">
            <table className="table" style={{ borderSpacing: "0 15px" }}>
              <tbody>
                {group.transactions.map((transaction, transactionIndex) => (
                  <tr key={transactionIndex}>
                    <td style={{ padding: "10px 15px" }}>
                      {transaction.produk.nama_produk}
                    </td>
                    <td style={{ padding: "10px 15px" }}>
                      {transaction.produk.harga_produk.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border border-slate-700 shadow-lg rounded-md py-12 px-64 mb-2">
            <table className="table" style={{ borderSpacing: "0 15px" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "10px 15px" }}>Total</td>
                  <td style={{ padding: "10px 15px" }}>
                    {group.transactions[0].no_nota}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 15px" }}>Tanggal Pesan</td>
                  <td style={{ padding: "10px 15px" }}>
                    {group.transactions[0].tanggal_transaksi}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 15px" }}>Customer</td>
                  <td style={{ padding: "10px 15px" }}>
                    {group.transactions[0].pesanan.customer.email}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border border-slate-700 shadow-lg rounded-md py-12 px-64 mb-2">
            <table className="table" style={{ borderSpacing: "0 15px" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "10px 15px" }}>Poin yang didapatkan</td>
                  <td style={{ padding: "10px 15px" }}>
                    {group.transactions[0].poin_didapatkan}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 15px" }}>Poin Sekarang</td>
                  <td style={{ padding: "10px 15px" }}>
                    {group.transactions[0].poin_now}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <Button onClick={generatePDFDocument}>
        Taruh disini untuk download Nota
      </Button>
    </div>
  );
};

export default Transaksi;
