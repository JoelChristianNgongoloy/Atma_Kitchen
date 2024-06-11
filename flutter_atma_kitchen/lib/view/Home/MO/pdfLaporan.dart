import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'dart:typed_data';

class pdfLaporan {
  static Future<Uint8List> generatePdf(
      List<dynamic> data, String selectedMonth) async {
    final pdf = pw.Document();
    List<dynamic> filteredData =
        data.where((e) => e['month'] == selectedMonth).toList();
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
              pw.Text('Laporan Pemasukkan & Pengeluaran',
                  style: pw.TextStyle(fontSize: 24)),
              pw.SizedBox(height: 20),
              pw.Text('Bulan: $selectedMonth',
                  style: pw.TextStyle(fontSize: 10)),
              pw.SizedBox(height: 20),
              pw.Text('Tahun: ${DateTime.now().year}',
                  style: pw.TextStyle(fontSize: 10)),
              pw.SizedBox(height: 20),
              pw.Text(
                  'Tanggal cetak: ${DateTime.now().toLocal().toString().split(' ')[0]}'),
              pw.SizedBox(height: 20),
              pw.Table.fromTextArray(
                context: context,
                data: <List<String>>[
                  <String>['Detail', 'Pemasukkan', 'Pengeluaran'],
                  ...filteredData.map((e) => [
                        e['detail'],
                        e['Pemasukkan'].toString(),
                        e['Pengeluaran'].toString(),
                      ]),
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
