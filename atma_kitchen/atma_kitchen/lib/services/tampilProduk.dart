import 'package:atma_kitchen/services/globals.dart';
import 'package:http/http.dart' as http;

class Produk {
  static Future<http.Response> index() async {
    var url = Uri.parse(baseURL + '/produkIndex');
    http.Response response = await http.get(url);
    return response;
  }
}
