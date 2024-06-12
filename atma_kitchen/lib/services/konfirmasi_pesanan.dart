import 'package:atma_kitchen/services/globals.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';  // pastikan untuk mengimpor dart:convert

class KonfirmasiPesanan {
  static Future<http.Response> index(String token) async {
    var url = Uri.parse('$baseURL/pesanan/tampilKonfirmasiPenerimaan');
    http.Response response = await http.get(
      url,
      headers: {
        'Authorization': 'Bearer $token',
      },
    );
    return response;
  }

  static Future<http.Response> detail(String token, int id) async {
    var url = Uri.parse('$baseURL/pesanan/$id');
    http.Response response = await http.get(
      url,
      headers: {
        'Authorization': 'Bearer $token',
      },
    );
    return response;
  }

  static Future<http.Response> update(String token, int id, String status) async {
    var url = Uri.parse('$baseURL/pesanan/$id');
    http.Response response = await http.put(
      url,
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({'status_pesanan': status}),
    );
    return response;
  }
}
