<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>verifikasi Akun</title>
</head>

<body>
    <p>
        Halo <b>{{ $details['nama_customer'] }}</b>
    </p>
    <p>
        Anda telah melakukan registrasi dengan menggunakan email ini.
    </p>

    <p>
        Berikut adalah data diri anda:
    </p>

    <table>
        <tr>
            <td>Nama</td>
            <td>:</td>
            <td>{{ $details['nama_customer'] }}</td>
        </tr>
        <tr>
            <td>Username</td>
            <td>:</td>
            <td>{{ $details['username'] }}</td>
        </tr>
        <tr>
            <td>Website</td>
            <td>:</td>
            <td>{{ $details['website'] }}</td>
        </tr>
        <tr>
            <td>Tanggal Register</td>
            <td>:</td>
            <td>{{ $details['tanggal_register'] }}</td>
        </tr>
    </table>

    <center>
        <h3>
            Buka link dibawah untuk melakukan verifikasi akun.
        </h3>

        <b style="color:blue">{{ $details['url'] }}</b>

    </center>

    <p>
        Terima Kasih telah melakukan registrasi.
    </p>
</body>

</html>
