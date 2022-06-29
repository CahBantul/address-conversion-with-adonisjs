"use strict";
const fetch = require("cross-fetch");
const URL = "https://kasirpintar.co.id/allAddress.txt";

// getData function
const getData = async () => {
  const res = await fetch(URL);

  if (res.status >= 400) {
    throw new Error("Bad response from server");
  }

  const data = await res.json();
  return data;
};

// function filter
const filterById = (jsonObject, id) => {
  return jsonObject.filter((jsonObject) => {
    return jsonObject["id"] == id;
  })[0];
};

// status code
const messages = {
  200: "success",
  201: "data saved!",
  400: "not found",
};

// function response json
const responseJson = (res, code, data) => {
  return res.status(code).json({ status: messages[code.toString()], data });
};

class AddressController {
  async showKecamatan({ params, request, response }) {
    try {
      const data = await getData();
      const kecamatan = data.address_kecamatan;
      const provinsi = data.address_provinsi;
      const kelurahan = data.address_kelurahan;
      const kota = data.address_kota;

      const selectedKecamatan = filterById(kecamatan, params.id);
      if (selectedKecamatan == undefined)
        return responseJson(response, 200, [{ message: "id not found!!!" }]);

      return responseJson(response, 200, [{ nama: selectedKecamatan.nama }]);
    } catch (error) {
      response.json({ status: "error", error });
    }
  }
}

module.exports = AddressController;