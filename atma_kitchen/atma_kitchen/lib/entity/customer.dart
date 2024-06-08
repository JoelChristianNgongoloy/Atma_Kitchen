class Order {
  final int id;
  String statusPesanan;
  final DateTime tanggalPesan;
  final double totalHarga;

  Order({
    required this.id,
    required this.statusPesanan,
    required this.tanggalPesan,
    required this.totalHarga,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'] as int,
      statusPesanan: json['status_pesanan'] ?? '', // handle null value
      tanggalPesan: DateTime.parse(json['tanggal_pesan'] as String), // parse string to DateTime
      totalHarga: (json['total_harga'] as num).toDouble(), // directly convert to double
    );
  }
}