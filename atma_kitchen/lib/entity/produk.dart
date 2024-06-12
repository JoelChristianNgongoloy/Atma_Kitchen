import 'dart:convert';

class Product {
  final int id;
  final String nama_produk;
  final double stok_produk;
  final String deskripsi_produk;
  final double harga_produk;
  final String? foto_produk;
  final String status_produk;
  final int? id_penitip;
  final String type;
  final String? loyang;

  Product({
    required this.id,
    required this.nama_produk,
    required this.stok_produk,
    required this.deskripsi_produk,
    required this.harga_produk,
    this.foto_produk,
    required this.status_produk,
    this.id_penitip,
    required this.type,
    this.loyang,
  });

  factory Product.fromrawJson(String str) => Product.fromJson(json.decode(str));
  factory Product.fromJson(Map<String, dynamic> json) => Product(
        id: json['id'],
        nama_produk: json['nama_produk'],
        stok_produk: (json['stok_produk'] as num).toDouble(),
        deskripsi_produk: json['deskripsi_produk'],
        harga_produk: (json['harga_produk'] as num).toDouble(),
        foto_produk: json['foto_produk'],
        status_produk: json['status_produk'],
        id_penitip: json['id_penitip'],
        type: json['type'],
        loyang: json['loyang'],
      );

  String toRawJson() => json.encode(toJson());
  Map<String, dynamic> toJson() => {
        "id": id,
        "nama_produk": nama_produk,
        "stok_produk": stok_produk,
        "deskripsi_produk": deskripsi_produk,
        "harga_produk": harga_produk,
        "foto_produk": json
      };
}
