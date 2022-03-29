package com.appsslpinning; // atualizar o packageName com o nome adequado

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;

import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;

public class SSLPinnerFactory implements OkHttpClientFactory {
    private static String hostname = "bk.eximia.co";

    public OkHttpClient createNewNetworkModuleClient() {
        CertificatePinner certificatePinner = new CertificatePinner.Builder()
                .add(hostname, "sha256/JYA4YmChut8JvL+9+b2maPi33k1rbFIBDsgMjFeUhfs=") // Chave pública gerada a partir do certificado
                //.add(hostname, "sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=") // Chave errada para simular bloqueio de requisição
                .build();

        OkHttpClient.Builder clientBuilder = OkHttpClientProvider.createClientBuilder();
        return clientBuilder
                .certificatePinner(certificatePinner)
                .build();
    }
}