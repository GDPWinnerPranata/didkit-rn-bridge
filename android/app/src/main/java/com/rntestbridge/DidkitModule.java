package com.rntestbridge;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.spruceid.DIDKit;

import org.json.JSONException;
import org.json.JSONObject;

public class DidkitModule extends ReactContextBaseJavaModule {
    DidkitModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "DidkitModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String verifyCredential(String credentialJSON) throws JSONException {
        JSONObject credential = new JSONObject(credentialJSON);

        String proofPurpose = credential.getJSONObject("proof").getString("proofPurpose");
        String verificationMethod = credential.getJSONObject("proof").getString("verificationMethod");

        String verificationOption = String.format("{\"proofPurpose\":\"%s\",\"verificationMethod\":\"%s\",\"type\": \"EcdsaSecp256k1RecoverySignature2020\"}", proofPurpose, verificationMethod);

        Log.d("Verification", credentialJSON);
        Log.d("Verification", verificationOption);
        String verification = DIDKit.verifyCredential(credentialJSON, verificationOption);

        Log.d("Verification", verificationOption);

        return verification;
    }
}

/**
    if (!credential.proof)                    throw new Error("Missing proof!");
    if (!credential.proof.proofPurpose)       throw new Error("Missing proof purpose!");
    if (!credential.proof.verificationMethod) throw new Error("Missing verification method!");

    const proofPurpose = credential.proof.proofPurpose;
    const verificationMethod = credential.proof.verificationMethod;

    const verificationOption = {
        proofPurpose,
        verificationMethod,
        type: "EcdsaSecp256k1RecoverySignature2020",
    };

    const verification = await didkit.verifyCredential(
        JSON.stringify(credential),
        JSON.stringify(verificationOption)
    );

    return JSON.parse(verification);
 */