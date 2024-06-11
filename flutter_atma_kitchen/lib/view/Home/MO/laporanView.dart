import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter_atma_kitchen/services/laporan.dart';
import 'package:flutter_atma_kitchen/view/Home/MO/pdfLaporan.dart';
import 'package:pdf/pdf.dart';
import 'package:printing/printing.dart';

class laporanView extends StatefulWidget {
  final String token;

  const laporanView(this.token, {Key? key}) : super(key: key);

  @override
  _laporanViewState createState() => _laporanViewState();
}

class _laporanViewState extends State<laporanView> {
  List<dynamic>? laporanData;

  @override
  void initState() {
    super.initState();
    fetchLaporan();
  }

  Future<void> fetchLaporan() async {
    try {
      final response = await Laporan.index(widget.token);

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        setState(() {
          laporanData = data['data'];
        });
      } else {
        print('Error: ${response.reasonPhrase}');
      }
      ;
    } catch (e) {
      print('Error: $e');
    }
  }

  void errorSnackBar(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
      ),
    );
  }

  void generateAndPrintPdf() async {
    if (laporanData != null) {
      final pdfData = await pdfLaporan.generatePdf(laporanData!, 'Juni');
      await Printing.layoutPdf(
        onLayout: (PdfPageFormat format) async => pdfData,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Laporan Pengeluaran Pemasukkan'),
        actions: [
          IconButton(
            onPressed: () => generateAndPrintPdf(),
            icon: Icon(Icons.print),
          ),
        ],
      ),
    );
  }
}
