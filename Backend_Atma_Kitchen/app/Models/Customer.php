<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    
    public $timestamps = false;
    protected $table = "customer";
    protected $primaryKey = "id_saldo";

    protected $fillable = [
        'saldo',
        'poin',
        'id_user',
        'id_alamat',
    ];

    public function User(){
        return $this->belongsTo(User::class, 'id_user');
    }
}
