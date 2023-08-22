import {
  Alert,
  Button,
  Dimensions,
  NativeModules,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';

const VC = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://www.w3.org/2018/credentials/examples/v1',
    {
      TempatLahir: 'ex:TempatLahir',
      BerlakuHingga: 'ex:BerlakuHingga',
      Kewarganegaraan: 'ex:Kewarganegaraan',
      Alamat: 'ex:Alamat',
      RTRW: 'ex:RTRW',
      StatusPerkawinan: 'ex:StatusPerkawinan',
      Agama: 'ex:Agama',
      Kecamatan: 'ex:Kecamatan',
      Provinsi: 'ex:Provinsi',
      GolonganDarah: 'ex:GolonganDarah',
      KotaKabupaten: 'ex:KotaKabupaten',
      KelurahanDesa: 'ex:KelurahanDesa',
      NIK: 'ex:NIK',
      Pekerjaan: 'ex:Pekerjaan',
      Nama: 'ex:Nama',
      TanggalLahir: 'ex:TanggalLahir',
    },
  ],
  id: 'https://example.org/bbd93713-e876-4ba1-aa86-687f12054cd5',
  type: ['VerifiableCredential', 'KTP'],
  credentialSubject: {
    TanggalLahir: 19900208,
    Kewarganegaraan: 'WNI',
    Pekerjaan: 'PEGAWAI SWASTA',
    NIK: 1808023348760001,
    GolonganDarah: 'O',
    BerlakuHingga: 'SEUMUR HIDUP',
    KotaKabupaten: 'JAKARTA PUSAT',
    Nama: 'JHON DOE',
    StatusPerkawinan: 'BELUM KAWIN',
    Provinsi: 'DKI JAKARTA',
    Alamat: 'JL. PETOJO VIJ.3 NO. 60',
    RTRW: '001/001',
    KelurahanDesa: 'CIDENG',
    Agama: 'ISLAM',
    Kecamatan: 'GAMBIR',
    TempatLahir: 'GROGOL',
  },
  issuer: 'did:pkh:eip155:1:0x684E11c41C6701737f6Ff40a3ff85b26F07cf04f',
  issuanceDate: '2023-08-22T01:45:09.622Z',
  proof: {
    '@context': [
      'https://identity.foundation/EcdsaSecp256k1RecoverySignature2020/lds-ecdsa-secp256k1-recovery2020-0.0.jsonld',
      'https://demo.spruceid.com/EcdsaSecp256k1RecoverySignature2020/esrs2020-extra-0.0.jsonld',
    ],
    type: 'EcdsaSecp256k1RecoverySignature2020',
    proofPurpose: 'assertionMethod',
    verificationMethod:
      'did:pkh:eip155:1:0x684E11c41C6701737f6Ff40a3ff85b26F07cf04f#blockchainAccountId',
    created: '2023-08-22T01:45:09.623Z',
    jws: 'eyJhbGciOiJFUzI1NkstUiIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..G4TFVnsSZECZXT7VqroFZdceGDRgSBn_nBf16dXdB49vAAeJJW7fdGfwLN1YAXhIs3C-Ps2tetyeGipAUJXuQQE',
  },
  holder:
    'did:polygonid:polygon:mumbai:2qFoqCWuCzmSJuyuBqdWt1cRZhPRunUS6ZPZycCPY8',
  validFrom: '2020-01-27T17:00:00.000Z',
  validUntil: '2177-12-30T17:00:00.000Z',
};

const STYLES = StyleSheet.create({
  container: {
    padding: 10,
  },
  textInput: {
    height: (Dimensions.get('window').height / 100) * 80,
    textAlignVertical: 'top',
    backgroundColor: 'white',
    color: 'black',
    marginBottom: 10,
    borderRadius: 10,
  },
});

export function DidkitVerify() {
  const [input, setInput] = useState(JSON.stringify(VC, null, 2));

  async function verify() {
    let errors: string;
    const {DidkitModule} = NativeModules;

    try {
      // Verification
      const response = await DidkitModule.verifyCredential(input);
      const result = JSON.parse(response);
      errors = result.errors.reduce(
        (prev: string, curr: string) => `${prev}${curr}\n`,
        '',
      );
    } catch (e) {
      errors = `${e}`;
    }

    const success = errors === '';

    const title = success ? 'Verification Successful!' : 'Verification Failed';
    const description = success
      ? Object.keys(JSON.parse(input).credentialSubject).reduce(
          (prev, curr) =>
            `${prev}${curr}: ${JSON.parse(input).credentialSubject[curr]}\n`,
          '',
        )
      : `Invalid credential:\n${errors}`;

    Alert.alert(title, description);
  }

  return (
    <SafeAreaView style={STYLES.container}>
      <TextInput
        multiline
        numberOfLines={20}
        style={STYLES.textInput}
        value={input}
        onChangeText={text => setInput(() => text)}
      />
      <Button title="Verify" onPress={verify} />
    </SafeAreaView>
  );
}
