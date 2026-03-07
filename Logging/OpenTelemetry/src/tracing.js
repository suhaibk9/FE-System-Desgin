import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { SimpleSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { XMLHttpRequestInstrumentation } from "@opentelemetry/instrumentation-xml-http-request";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

// ──────────────────────────────────────────────
// OpenTelemetry Tracing Setup
// All config values come from .env (prefixed with REACT_APP_)
// ──────────────────────────────────────────────

const serviceName = process.env.REACT_APP_OTEL_SERVICE_NAME || "ecommerce-app";
const exporterUrl = process.env.REACT_APP_OTEL_EXPORTER_URL;

// 1. Create a Tracer Provider (the main SDK entry point)
const provider = new WebTracerProvider();

// 2. Choose exporter based on env config
//    - If REACT_APP_OTEL_EXPORTER_URL is set → send traces to that OTLP endpoint
//    - Otherwise → log spans to the browser console
if (exporterUrl) {
  provider.addSpanProcessor(
    new SimpleSpanProcessor(new OTLPTraceExporter({ url: exporterUrl }))
  );
  console.log(`✅ OpenTelemetry sending traces to: ${exporterUrl}`);
} else {
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  console.log("✅ OpenTelemetry tracing initialized — spans will appear in the console.");
}

// 3. Register the provider globally so trace.getTracer() works everywhere
provider.register({
  contextManager: new ZoneContextManager(), // Required for async context propagation in browser
});

// 4. Auto-instrument document loads, fetch() calls, and XMLHttpRequests
registerInstrumentations({
  instrumentations: [
    new DocumentLoadInstrumentation(),       // Traces page load performance
    new FetchInstrumentation(),              // Traces all fetch() calls
    new XMLHttpRequestInstrumentation(),     // Traces all XHR calls
  ],
});
