import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:atma_kitchen/services/konfirmasi_pesanan.dart';
import 'package:atma_kitchen/entity/customer.dart';  // Import the Order model

class CustomerView extends StatefulWidget {
  final String token;
  final String id;  // add this line to fix the constructor

  const CustomerView(this.token, this.id, {Key? key}) : super(key: key);

  @override
  _CustomerViewState createState() => _CustomerViewState();
}

class _CustomerViewState extends State<CustomerView> {
  List<Order>? konfirmasiPesananData;
  String errorMessage = '';

  @override
  void initState() {
    super.initState();
    fetchPesananData(widget.token);
  }

  fetchPesananData(String token) async {
    try {
      var response = await KonfirmasiPesanan.index(token);
      if (response.statusCode == 200) {
        setState(() {
          konfirmasiPesananData = (jsonDecode(response.body)['data'] as List)
              .map((data) => Order.fromJson(data))
              .toList();
        });
      } else {
        setState(() {
          errorMessage = 'Failed to fetch pesanan data';
        });
      }
    } catch (e) {
      setState(() {
        errorMessage = 'Error fetching pesanan data: $e';
      });
    }
  }

  updateStatus(int id, String status) async {
    try {
      var response = await KonfirmasiPesanan.update(widget.token, id, status);
      if (response.statusCode == 200) {
        setState(() {
          fetchPesananData(widget.token);
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Status updated successfully'),
            backgroundColor: Colors.green,
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to update status'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error updating status: $e'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Konfirmasi Pesanan'),
      ),
      body: konfirmasiPesananData == null
          ? Center(
              child: errorMessage.isNotEmpty
                  ? Text(errorMessage)
                  : CircularProgressIndicator(),
            )
          : ListView.builder(
              itemCount: konfirmasiPesananData!.length,
              itemBuilder: (context, index) {
                var pesanan = konfirmasiPesananData![index];
                return ListTile(
                  title: Text('ID Pesanan: ${pesanan.id}'),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Tanggal Pesan: ${pesanan.tanggalPesan}'),
                      Text('Status: ${pesanan.statusPesanan}'),
                    ],
                  ),
                  trailing: ElevatedButton(
                    onPressed: () {
                      String newStatus = pesanan.statusPesanan == 'Sedang dikirim' || pesanan.statusPesanan == 'Siap di pick up'
                          ? 'Selesai'
                          : pesanan.statusPesanan;
                      updateStatus(pesanan.id, newStatus);
                    },
                    child: Text('Konfirmasi'),
                  ),
                );
              },
            ),
    );
  }
}
