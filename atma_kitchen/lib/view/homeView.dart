import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:atma_kitchen/services/tampilProduk.dart';
import 'package:atma_kitchen/entity/produk.dart';

class HomeView extends StatefulWidget {
  const HomeView({Key? key}) : super(key: key);

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  List<dynamic>? produkData;

  @override
  void initState() {
    super.initState();
    fetchProducts();
  }

  fetchProducts() async {
    var response = await Produk.index();

    if (response.statusCode == 200) {
      setState(() {
        produkData = jsonDecode(response.body)['data'];
      });
    } else {
      print('Failed to fetch Produk data');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Produk List'),
        ),
        body: produkData == null
            ? Center(
                child: CircularProgressIndicator(),
              )
            : ListView.builder(
                itemCount: produkData!.length,
                itemBuilder: (context, index) {
                  var produk = produkData![index];
                  return ListTile(
                    title: Text('Nama Produk: ${produk['nama_produk']}'),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Status Produk: ${produk['status_produk']}'),
                        Text('Harga Produk: ${produk['harga_produk']}'),
                        Text('Type: ${produk['type']}'),
                      ],
                    ),
                  );
                },
              ));
  }
}
