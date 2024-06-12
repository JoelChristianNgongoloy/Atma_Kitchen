import 'dart:convert';
import 'package:atma_kitchen/services/globals.dart';
import 'package:http/http.dart' as http;

class DataService {
  static Future<http.Response> index(String token) async {
    var url = Uri.parse(baseURL + '/pencatatanBahanBaku');
    http.Response response = await http.get(
      url,
      headers: {
        'Authorization': 'Bearer $token',
      },
    );
    return response;
  }
}
