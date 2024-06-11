import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_atma_kitchen/services/presensi.dart';

class MOView extends StatefulWidget {
  final String token;

  const MOView(this.token, {Key? key}) : super(key: key);

  @override
  _MOViewState createState() => _MOViewState();
}

class _MOViewState extends State<MOView> {
  List<dynamic>? presensiData;
  String newStatus = '';

  @override
  void initState() {
    super.initState();
    fetchPresensiData(widget.token);
  }

  fetchPresensiData(String token) async {
    try {
      var response = await Presensi.index(token);
      if (response.statusCode == 200) {
        setState(() {
          presensiData = jsonDecode(response.body)['data'];
        });
      } else {
        print('Failed to fetch presensi data');
      }
    } catch (e) {
      print('Error fetching presensi data: $e');
    }
  }

  updateStatus(int id, String status) async {
    try {
      var response = await Presensi.update(widget.token, id, status);
      if (response.statusCode == 200) {
        print('status updated successfully');
      } else {
        print('Failed to update status');
      }
    } catch (e) {
      print('Error updating status: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Presensi Data'),
      ),
      body: presensiData == null
          ? Center(
              child: CircularProgressIndicator(),
            )
          : ListView.builder(
              itemCount: presensiData!.length,
              itemBuilder: (context, index) {
                var presensi = presensiData![index];
                return ListTile(
                  title: Text('ID: ${presensi['id']}'),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Tanggal Presensi: ${presensi['tanggal_presensi']}'),
                      Text('Status: ${presensi['status_presensi']}'),
                      Text('ID User: ${presensi['id_user']}'),
                    ],
                  ),
                  trailing: ElevatedButton(
                    onPressed: () {
                      // Toggle the status between 'masuk' and 'bolos'
                      String newStatus = presensi['status_presensi'] == 'Masuk'
                          ? 'Bolos'
                          : 'Masuk';
                      // Call updateStatus to update the status
                      updateStatus(presensi['id'], newStatus);
                    },
                    child: Text('Update'),
                  ),
                );
              },
            ),
    );
  }
}
