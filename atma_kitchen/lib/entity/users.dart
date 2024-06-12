import 'dart:convert';

class Users {
  int id;
  String nama;
  String username;
  String password;
  DateTime tanggalLahir;
  String email;
  String verifyKey;
  int active;
  DateTime emailVerifiedAt;
  String rememberToken;
  DateTime createdAt;
  DateTime updatedAt;
  int idRole;

  Users({
    required this.id,
    required this.nama,
    required this.username,
    required this.password,
    required this.tanggalLahir,
    required this.email,
    required this.verifyKey,
    required this.active,
    required this.emailVerifiedAt,
    required this.rememberToken,
    required this.createdAt,
    required this.updatedAt,
    required this.idRole,
  });

// To parse this JSON data, do
  factory Users.fromrawJson(String str) => Users.fromJson(json.decode(str));
  factory Users.fromJson(Map<String, dynamic> json) => Users(
        id: json["id"],
        nama: json["nama"],
        username: json["username"],
        password: json["password"],
        tanggalLahir: DateTime.parse(json["tanggal_lahir"]),
        email: json["email"],
        verifyKey: json["verify_key"],
        active: json["active"],
        emailVerifiedAt: DateTime.parse(json["email_verified_at"]),
        rememberToken: json["remember_token"],
        createdAt: DateTime.parse(json["created_at"]),
        updatedAt: DateTime.parse(json["updated_at"]),
        idRole: json["id_role"],
      );

  String toRawJson() => json.encode(toJson());
  Map<String, dynamic> toJson() => {
        "id": id,
        "nama": nama,
        "username": username,
        "password": password,
        "tanggal_lahir": tanggalLahir.toIso8601String(),
        "email": email,
        "verify_key": verifyKey,
        "active": active,
        "email_verified_at": emailVerifiedAt.toIso8601String(),
        "remember_token": rememberToken,
        "created_at": createdAt.toIso8601String(),
        "updated_at": updatedAt.toIso8601String(),
        "id_role": idRole,
      };
}
