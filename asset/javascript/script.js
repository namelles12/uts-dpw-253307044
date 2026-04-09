let currentStep = 1;
function goToStep(nextStepNum) {
    if (currentStep === 1 && nextStepNum === 2) {
        const rNama = document.getElementById('regNama').value.trim();
        const rEmail = document.getElementById('regEmail').value.trim();
        if (!rNama || !rEmail) {
            showToast('Ops! Lengkapi Nama dan Email di Registrasi Akun terlebih dahulu.', 'error');
            return;
        }
    }

    if (currentStep === 2 && nextStepNum === 3) {
        const nNama = document.getElementById('bioNama').value.trim();
        const nisn = document.getElementById('bioNisn').value.trim();

        if (!nNama || !nisn) {
            showToast('Bagian Nama Lengkap & NISN di Biodata adalah pundi yang wajib diisi!', 'error');
            return;
        }

        const isPureNumber = /^\d{10}$/.test(nisn);
        if (!isPureNumber) {
            showToast('NISN harus 10 digit mutlak bersifat angka.', 'error');
            return;
        }
    }

    document.querySelectorAll('.form-step').forEach(el => el.classList.add('hidden'));
    document.getElementById('step-' + nextStepNum).classList.remove('hidden');
    document.querySelectorAll('.stepper-item').forEach((el, index) => {
        let actualStepNumber = index + 1;
        el.classList.remove('active', 'completed');

        if (actualStepNumber < nextStepNum) {
            el.classList.add('completed');
        } else if (actualStepNumber === nextStepNum) {
            el.classList.add('active');
        }
    });

    currentStep = nextStepNum;
    const titles = ["", "Tahap 1: Registrasi Akun", "Tahap 2: Isi Borang Biodata", "Tahap 3: Upload Dokumen Fisik", "Tahap 4: Status Form"];
    document.getElementById('form-main-title').textContent = titles[currentStep];
}

function submitAkhir() {
    const fKes = document.getElementById('fileKesehatan').value;
    const fIjazah = document.getElementById('fileIjazah').value;

    if (!fKes || !fIjazah) {
        showToast('Mohon lampirkan File Cek Kesehatan dan File Ijazah Anda secara logis!', 'error');
        return;
    }

    document.body.style.cursor = 'wait';
    showToast('Mengupload dan mengakselerasi berkas data Anda...', 'success');

    setTimeout(() => {
        document.body.style.cursor = 'default';
        showToast('Pendaftaran Sukses Tertracking!', 'success');
        goToStep(4);
    }, 1800);
}
function showToast(message, type) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.className = 'toast';
    toast.textContent = message;
    toast.offsetWidth;

    if (type === 'success') {
        toast.classList.add('toast-success');
    } else if (type === 'error') {
        toast.classList.add('toast-error');
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}
