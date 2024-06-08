import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:printing/printing.dart';
import 'package:pdf/pdf.dart';
import 'package:atma_kitchen/services/dataService.dart'; // Ganti dengan nama project Anda
import 'package:atma_kitchen/view/Home/pdfgenerator.dart'; // Ganti dengan nama project Anda

class PencatatanBahanBakuView extends StatefulWidget {
  final String token;

  PencatatanBahanBakuView(this.token);

  @override
  _PencatatanBahanBakuViewState createState() =>
      _PencatatanBahanBakuViewState();
}

class _PencatatanBahanBakuViewState extends State<PencatatanBahanBakuView> {
  List<dynamic>? data;
  String? errorMessage;

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    try {
      final response = await DataService.index(widget.token);

      if (response.statusCode == 200) {
        setState(() {
          data = jsonDecode(response.body)['data'];
          errorMessage = null;
        });
      } else {
        setState(() {
          errorMessage = 'Gagal memuat data: ${response.body}';
        });
      }
    } catch (e) {
      print('Error: $e');
      setState(() {
        errorMessage = 'Gagal memuat data: $e';
      });
    }
  }

  void errorSnackBar(BuildContext context, String text) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(text),
        backgroundColor: Colors.red,
        duration: const Duration(seconds: 1),
      ),
    );
  }

  void generateAndPrintPdf() async {
    if (data != null) {
      final pdfData = await PdfGenerator.generatePdf(data!);
      await Printing.layoutPdf(
        onLayout: (PdfPageFormat format) async => pdfData,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Laporan Stok Bahan Baku'),
      ),
      body: Center(
        child: data == null
            ? errorMessage != null
                ? Text(errorMessage!)
                : CircularProgressIndicator()
            : ElevatedButton(
                onPressed: generateAndPrintPdf,
                child: Text('Generate PDF'),
              ),
      ),
    );
  }
}
