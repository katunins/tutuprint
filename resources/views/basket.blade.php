<?php 
// получим корзину - вернем сумму ее и количество позиций
$userId='';
if (Auth::user()) {
    $userId = Auth::user()->id;
        

    } elseif (Session::has('temporaryUser')) {
            $userId = Session::get('temporaryUser');

    } 
    if ($userId !='') $basket = DB::table('basket')->where('userId', $userId)->get(); else $basket = false;
    $summ = 0;
?>

@extends('layouts.app')

@section('title', 'Корзина')
<link rel="stylesheet" href={{ asset('css/basket.css') }}>

@section('content')

@if ($basket)
@foreach ($basket as $item)
<?php 
        $param = json_decode($item->data);
        $summ += $param->price->data; 
        $size = str_replace(' ', '', $param->size->data); 
        $basketFolder = 'public/basket/' .$item->userId .'/'.'N_'.$item->basketId.'/'.$size;
        $thumbnailUrl = Storage::files($basketFolder);
        if (count($thumbnailUrl) > 0) $thumbnailUrl = $thumbnailUrl[0]; else $thumbnailUrl = asset ('images/empty.jpg')
        ?>
<div class="basket-block">

    <div class="preview" style="background-image: url({{ Storage::disk('local')->url($thumbnailUrl) }})">
    </div>
    <div class="params">
        <h3>{{ $param->product->data }}</h3>
        <ul>
            <li>Формат: <span>{{ $param->size->data }}</span></li>
            <li>Количество: <span>{{ $param->count->data }} шт.</span></li>

            @if ($param->whiteborder->data)
            <li>Белая рамка по краям</li>
            @endif

            @if ($param->box->data)
            <li>Коробка c надписью: "{{ $param->box->text }}"</li>
            @endif
        </ul>
    </div>
    <div class="price" price={{ $param->price->data }}>
        <span>{{ number_format($param->price->data, 0, '', ' ' ) }}₽</span>
        <div>
            <button>Удалить</button>
        </div>
    </div>
</div>
@endforeach
{{-- {{ route('register') }} --}}
<form action="{{ route('payorder') }}" role="form" method="post">
    @csrf
    <h3>Способ доставки</h3>

    <div class="delivery-block">
        <div class="form-block">

            <input type="radio" name="delivery" id="vrn_delivery" value="vrn_delivery" checked price=250>
            <label for="vrn_delivery">Курьером в Воронеже (250 руб)</label>
        </div>

        <div class="form-block">
            <input type="radio" name="delivery" id="vrn_pickup" value="vrn_pickup" price=0>
            <label for="vrn_pickup">Самостоятельно на ул. Театральная, 11</label>
        </div>

        {{-- <div class="form-block">
            <input type="radio" name="delivery" id="cdek" value="cdek">
            <label for="cdek">Доставка CDEK в другие регионы</label>
        </div> --}}
    </div>

    <div class="form-center-block">



        <label for="name">Фамилия Имя получателя</label>
        <input type="text" name="name" placeholder="Антонов Сергей" value="{{ old('name') }}">

        @error('name') <div class="alert">{{ $message }}</div> @enderror

        <div class="adress-block">
            <label for="vrn_adress">Адрес в Воронеже</label>
            <input type="text" name="vrn_adress" placeholder="Московский проспект, 10 / кв">
        </div>

        <label for="tel">Телефон</label>
        {{-- <label for="tel">+7 </label> --}}
        <input type="tel" name="tel" placeholder="+7 (___) ___-____" id="tel" value="{{ old('tel') }}">
        @error('tel') <div class=" alert">{{ $message }}</div> @enderror
        {{-- <input type="text" name="tel" placeholder="Антонов Сергей"> --}}
    </div>

    <div class="form-center-block">
        <button class="all-price">
            <p>Оплатить</p>
            <span id="all-price"></span><span>₽</span>
        </button>
    </div>

    {{-- <div class="form-block">
        <div class="message">
        </div>
        <div class="time">

        </div>
    </div> --}}


</form>

@else
<div class="empty">
    Корзина пуста
</div>
@endif



@endsection

@section('back')
{{ url('/') }}
@endsection

<script src="{{ asset('js/basket.js') }}"></script>
<script>
    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
        }
    }

    function mask(event) {
        var matrix = "+7 (___) ___-____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        if (def.length >= val.length) val = def;
        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
        if (event.type == "blur") {
            if (this.value.length == 2) this.value = ""
        } else setCursorPosition(this.value.length, this)
    };
    // function mask(event) {
	// 	const keyCode = event.keyCode;
	// 	const template = '+7 (___) ___-__-__',
	// 		def = template.replace(/\D/g, ""),
	// 		val = this.value.replace(/\D/g, "");
	// 	// console.log(template);
	// 	let i = 0,
	// 		newValue = template.replace(/[_\d]/g, function (a) {
	// 			return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
	// 		});
	// 	i = newValue.indexOf("_");
	// 	if (i !== -1) {
	// 		newValue = newValue.slice(0, i);
	// 	}
	// 	let reg = template.substr(0, this.value.length).replace(/_+/g,
	// 		function (a) {
	// 			return "\\d{1," + a.length + "}";
	// 		}).replace(/[+()]/g, "\\$&");
	// 	reg = new RegExp("^" + reg + "$");
	// 	if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
	// 		this.value = newValue;
	// 	}
	// 	if (event.type === "blur" && this.value.length < 5) {
	// 		this.value = "";
	// 	}

    // }
    
    function recalcAllPrice () {
        let orderSumm = 0
        let deliverySumm = document.querySelector (('input[name="delivery"]:checked')).getAttribute('price')
        
        document.querySelectorAll('.price').forEach(elem=>{
            orderSumm += Number(elem.getAttribute('price'))
        })

        let allSumm = Number (orderSumm) + Number (deliverySumm)
        let allSummElem = document.getElementById ('all-price')
        allSummElem.innerHTML = allSumm
        allSummElem.setAttribute('allsumm', allSumm)
    }

document.addEventListener('DOMContentLoaded', function () {
    recalcAllPrice ()
    const elems = document.getElementById('tel');
    elems.addEventListener("input", mask);
		elems.addEventListener("focus", mask);
		elems.addEventListener("blur", mask);

        let adress = document.querySelector('.adress-block')

        document.querySelectorAll ('input[name="delivery"]').forEach (elem=>{
            elem.onchange= function (event) {
            if (event.target.value == 'vrn_delivery') {
                adress.classList.remove ('hide')
            } else {
                adress.classList.add ('hide')
            }
            recalcAllPrice ()
        }
        })
})
</script>