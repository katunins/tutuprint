@if(Session::has('modal-info'))
    <div class="modal">
        <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21.5 11C21.5 16.799 16.799 21.5 11 21.5C5.20101 21.5 0.5 16.799 0.5 11C0.5 5.20101 5.20101 0.5 11 0.5C16.799 0.5 21.5 5.20101 21.5 11Z"
                stroke="#007AFF" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M12.25 5.75C12.25 6.44036 11.6904 7 11 7C10.3096 7 9.75 6.44036 9.75 5.75C9.75 5.05964 10.3096 4.5 11 4.5C11.6904 4.5 12.25 5.05964 12.25 5.75ZM10 8H9V9H10V16H9V17H10H12H13V16H12V9V8H10Z"
                fill="#007AFF" />
        </svg>
        {{ Session::get('modal-info') }}
    </div>
@endif
