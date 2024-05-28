<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promo_Poin extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = "id";
    protected $table = "promo_poin";

    protected $fillable = [
        'jumlah_promo',
        'deskripsi_promo',
        'id_customer',
    ];

    public function customer() {
        return $this->belongsTo(User::class, 'id_customer');
    }
}
