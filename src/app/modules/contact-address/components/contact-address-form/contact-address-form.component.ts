import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordStatus } from 'src/app/complex-types';
import { CountryReadDto } from 'src/app/modules/order/models/order.dto';
import { ApiUrlPipe } from 'src/app/pipes/api-url.pipe';
import { GoogleMapComponent, LatLng } from 'src/app/shared/components/google-map/google-map.component';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { TranslationEntryDto } from 'src/app/shared/models/translation-entry.dto';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { CountryService } from 'src/app/shared/services/country.service';
import { FileService } from 'src/app/shared/services/file.service';
import { SubSink } from 'subsink';
import { ContactAddressDto, ContactAddressUpsertDto } from '../../models/contact-address.dto';
import { ContactAddressService } from '../../services/contact-address.service';

@Component({
    selector: 'app-contact-address-form',
    templateUrl: './contact-address-form.component.html',
    styleUrls: ['./contact-address-form.component.scss'],
    providers: [ApiUrlPipe]
})
export class ContactAddressFormComponent implements OnInit, OnDestroy {
    @ViewChild('map', { static: true }) public map: GoogleMapComponent | undefined;

    public get isLoading(): boolean {
        return this._contactAddressService.isLoading || this._fileService.isLoading;
    }

    private _contactAddressImage: string | undefined = undefined;
    public get contactAddressImage(): string | undefined {
        return this._contactAddressImage;
    }

    private _contactAddressForm = this._formBuilder.group({
        id: [0, [Validators.required]],
        titleKey: ['', [Validators.required]],
        addressKey: ['', [Validators.required]],
        workingHoursKey: ['', [Validators.required]],
        title: ['', [Validators.required]],
        phoneNumberCountryCode: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        email: ['', [Validators.required]],
        latitudeLongitude: ['', [Validators.required]],
        sortOrder: [1, [Validators.required]],
        status: [RecordStatus.Passive, [Validators.required]],
        tokens: [[]]
    });
    public get contactAddressForm(): UntypedFormGroup {
        return this._contactAddressForm;
    }

    private _subsink = new SubSink();

    private _formModel: MultilanguageEntityDto<ContactAddressDto> | undefined = undefined;
    public get formModel(): MultilanguageEntityDto<ContactAddressDto> | undefined {
        return this._formModel;
    }

    private _addressTranslations: Array<TranslationEntryDto> = [];
    public get addressTranslations(): Array<TranslationEntryDto> {
        return this._addressTranslations;
    }
    private _titleTranslations: Array<TranslationEntryDto> = [];
    public get titleTranslations(): Array<TranslationEntryDto> {
        return this._titleTranslations;
    }
    private _workingHoursTranslations: Array<TranslationEntryDto> = [];
    public get workingHoursTranslations(): Array<TranslationEntryDto> {
        return this._workingHoursTranslations;
    }

    private _countries: Array<CountryReadDto> = [];
    public get countries(): Array<CountryReadDto> {
        return this._countries;
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _contactAddressService: ContactAddressService,
        private _fileService: FileService,
        private _countryService: CountryService,
        private _apiUrlPipe: ApiUrlPipe,
        private _confirmation: ConfirmationService
    ) { }

    public async ngOnInit(): Promise<void> {
        this._subsink.add(this._route.paramMap.subscribe(async p => {
            const contactAddressId = Number(p.get('id'));
            this._formModel = await this._contactAddressService.getInstance(contactAddressId);

            console.log(this._formModel);
            if (!this._formModel) { return; }

            this._contactAddressForm.setValue({
                id: contactAddressId,
                titleKey: this._formModel.entity.titleKey,
                addressKey: this._formModel.entity.addressKey,
                workingHoursKey: this._formModel.entity.workingHoursKey,
                title: this._formModel.entity.title,
                phoneNumberCountryCode: this._formModel.entity.phoneNumberCountryCode,
                phone: this._formModel.entity.phone,
                email: this._formModel.entity.email,
                latitudeLongitude: this._formModel.entity.latitudeLongitude,
                sortOrder: this._formModel.entity.sortOrder,
                status: this._formModel.entity.status??1,
                tokens: [],
            });

            
            this._addressTranslations = this._formModel.translations.filter(t => t.property === 'Address');
            this._titleTranslations = this._formModel.translations.filter(t => t.property === 'Title');
            this._workingHoursTranslations = this._formModel.translations.filter(t => t.property === 'WorkingHours');

            if (this.formModel && this.formModel.entity){
            const splitted = this._formModel.entity.latitudeLongitude.split(',');
            if (splitted.length === 2) {

                const lat = Number(splitted[0]);
                const lng = Number(splitted[1]);

                this.map?.setCenter({
                    lat: lat,
                    lng: lng
                });
                this.map?.setZoom(15);
                this.map?.setMarkers([{
                    label: '',
                    position: {
                        lat: lat,
                        lng: lng
                    }
                }]);
            }
            }

            if (this.formModel && this.formModel.entity && this.formModel.entity.image && this.formModel.entity.image.imagePath) {
                this._thumbImage = this._apiUrlPipe.transform(this.formModel.entity.image.imagePath)
            }
        }));

        this._countries = await this._countryService.getAll();

    }

    public ngOnDestroy(): void {
        this._subsink.unsubscribe();
    }

    private _formErrors: Array<string> = [];
    public get formErrors(): Array<string> {
        return this._formErrors;
    }

    public async onSaveClick(): Promise<void> {
        //if (this._contactAddressForm.invalid || this.isLoading) { return; }
        try {
            this._formErrors = [];
            await this._contactAddressService.upsert({
                data: {
                    entity: {
                        ...this._contactAddressForm.value,
                        title: this._titleTranslations?.find(item => item.language.symbol === "tr-TR" && item.property == "Title")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US' && item.property == "Title")?.entryValue,
                        address: this._addressTranslations?.find(item => item.language.symbol === "tr-TR" && item.property == "Address")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US' && item.property == "Address")?.entryValue,
                        workingHours: this._workingHoursTranslations?.find(item => item.language.symbol === "tr-TR" && item.property == "WorkingHours")?.entryValue || this._formModel?.translations?.find(item => item.language.symbol === 'en-US' && item.property == "WorkingHours")?.entryValue,
                        isActive: typeof (this._contactAddressForm.value.isActive) === 'string' ? this._contactAddressForm.value.isActive == 'true' : this._contactAddressForm.value.isActive,
                    },
                    translations: [
                        ...this._titleTranslations,
                        ...this._addressTranslations,
                        ...this._workingHoursTranslations
                    ]
                }
            });
            this._router.navigateByUrl('/apps/administration/contact-addresses/list');
        } catch (error: any) {
            this._formErrors = error;
            window.scrollTo({ top: 0 })
        }
    }

    public onTranslationEntryChange(): void {
    }

    private _thumbImg: File | undefined = undefined;
    public get thumbImg(): File | undefined {
        return this._thumbImg;
    }

    private _thumbImage: string = '/assets/media/svg/files/blank-image.svg';
    public get thumbImage(): string {
        return this._thumbImage;
    }

    @ViewChild('thumbInput', { static: false }) public thumbInput: ElementRef | undefined;

    public async onThumbChange(e: any): Promise<void> {
        if (!e.target.files[0]) { return; }

        this._thumbImg = e.target.files[0];

        if (this._thumbImg) {
            this._thumbImage = await this._fileService.getLocalSource(this._thumbImg);

            (<any>this._contactAddressForm.get('tokens')).value.push(await this._fileService.postFile(this._thumbImg));
        }

        if (this.thumbInput) {
            this.thumbInput.nativeElement.value = '';
        }

        console.log(this._contactAddressForm.get('tokens')?.value)
    }

    public async onMapClick(latLng: LatLng): Promise<void> {
        const res = await this._confirmation.confirm({
            content: "ATTENTION!! Updating the Lat/Lng position.",
        });
        if (!res) { return; }

        this.map?.setMarkers([{
            label: '',
            position: latLng
        }]);

        this._contactAddressForm.get('latitudeLongitude')?.setValue(`${latLng.lat},${latLng.lng}`);
    }
}
