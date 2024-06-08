import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'dart:typed_data';

class PdfGenerator {
  static Future<Uint8List> generatePdf(List<dynamic> data) async {
    final pdf = pw.Document();

    pdf.addPage(
      pw.Page(
        build: (pw.Context context) {
          return pw.Column(
            crossAxisAlignment: pw.CrossAxisAlignment.start,
            children: [
              pw.Text('Atma Kitchen', style: pw.TextStyle(fontSize: 24)),
              pw.Text('Jl. Centralpark No. 10 Yogyakarta',
                  style: pw.TextStyle(fontSize: 15)),
              pw.SizedBox(height: 40),
              pw.Text('Laporan Stok Bahan Baku',
                  style: pw.TextStyle(fontSize: 24)),
              pw.SizedBox(height: 20),
              pw.Text(
                  'Tanggal cetak: ${DateTime.now().toLocal().toString().split(' ')[0]}'),
              pw.SizedBox(height: 20),
              pw.Table.fromTextArray(
                context: context,
                data: <List<String>>[
                  <String>['Nama Bahan', 'Satuan', 'Stok'],
                  ...data
                      .map((item) => [
                            item['bahan_baku']['nama_bahan_baku'].toString(),
                            item['satuan'].toString(),
                            item['jumlah_bahan_baku'].toString()
                          ])
                      .toList(),
                ],
              ),
            ],
          );
        },
      ),
    );

    return pdf.save();
  }
}
