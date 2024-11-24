import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Sag } from '../../../types/law';

const API_URL = process.env.API_URL;

export async function GET() {
  const query = `$filter=(typeid eq 3 or typeid eq 5 or typeid eq 9) and periodeid eq 160`;

  try {

    // Check if data exists in the database
    const existingData = await prisma.sag.findMany();

    if (existingData.length > 0) {
      return NextResponse.json({ success: true, data: existingData });
    }

    const response = await fetch(`${API_URL}?${query}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const apiData = await response.json();

    //uging helper funtion for readability
    const sags: Sag[] = apiData.value.map(mapApiSagToSag);

    await prisma.sag.createMany({
      data: sags,
      skipDuplicates: true,
    });

    return NextResponse.json({ success: true, data: sags });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

function mapApiSagToSag(apiSag: any): Sag {
  return {
    id: apiSag.id,
    typeid: apiSag.typeid,
    kategoriid: apiSag.kategoriid,
    statusid: apiSag.statusid,
    titel: apiSag.titel,
    titelkort: apiSag.titelkort,
    offentlighedskode: apiSag.offentlighedskode,
    nummer: apiSag.nummer,
    nummerprefix: apiSag.nummerprefix,
    nummernumerisk: apiSag.nummernumerisk,
    nummerpostfix: apiSag.nummerpostfix,
    resume: apiSag.resume,
    afstemningskonklusion: apiSag.afstemningskonklusion,
    periodeid: apiSag.periodeid,
    afgorelsesresultatkode: apiSag['afgørelsesresultatkode'],
    baggrundsmateriale: apiSag.baggrundsmateriale,
    opdateringsdato: new Date(apiSag.opdateringsdato),
    statsbudgetsag: apiSag.statsbudgetsag,
    begrundelse: apiSag.begrundelse,
    paragrafnummer: apiSag.paragrafnummer,
    paragraf: apiSag.paragraf,
    afgorelsesdato: apiSag['afgørelsesdato'] ? new Date(apiSag['afgørelsesdato']) : undefined,
    afgorelse: apiSag['afgørelse'],
    raadsmodedato: apiSag['rådsmødedato'] ? new Date(apiSag['rådsmødedato']) : undefined,
    lovnummer: apiSag.lovnummer,
    lovnummerdato: apiSag.lovnummerdato ? new Date(apiSag.lovnummerdato) : undefined,
    retsinformationsurl: apiSag['retsinformationsurl'],
    fremsatundersagid: apiSag.fremsatundersagid,
    deltundersagid: apiSag.deltundersagid,
  };
}