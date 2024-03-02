import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

// Define una función asincrónica llamada 'middleware' que acepta una solicitud (req) como argumento.
export async function middleware(req: NextRequest) {
    // Crea una respuesta de Next.js que simplemente continúa con la cadena de middleware o manejo de rutas.
    const res = NextResponse.next();
    
    // Crea un cliente de middleware de Supabase, pasando la solicitud y respuesta actuales.
    // Esto permite al cliente manejar la autenticación basada en el contexto actual de la solicitud y respuesta.
    const supabase = createMiddlewareClient({ req, res });

    // Intenta obtener la sesión actual del usuario utilizando el cliente de Supabase.
    const {
        data: { session },
    } = await supabase.auth.getSession();
    
    // Verifica si la ruta de la solicitud comienza con '/dashboard'.
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        // Si no hay sesión (es decir, el usuario no está autenticado), redirige al usuario a la página de inicio de sesión.
        if (!session) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // Maneja el error específico de enlace de email inválido o expirado.
    const emailLinkError = 'Email link is invalid or has expired';
    // Comprueba si el parámetro 'error_description' en la URL coincide con el mensaje de error de enlace de email
    // y si la ruta actual no es '/signup'.
    if (req.nextUrl.searchParams.get('error_description') === emailLinkError && req.nextUrl.pathname !== '/signup') {
        // Redirige al usuario a la página de registro (signup) y pasa el error en la URL.
        return NextResponse.redirect(new URL(`/signup?error_description=#${req.nextUrl.searchParams.get('error')}`, req.url));
    }

    // Verifica si la ruta actual es '/login' o '/signup'.
    if (['/login', '/signup'].includes(req.nextUrl.pathname)) {
        // Si el usuario ya tiene una sesión (está autenticado), redirige al usuario a la página del dashboard.
        if (session) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
    }

    // Si ninguna de las condiciones anteriores se cumple, simplemente continúa con el manejo normal de la solicitud.
    return res;
}
