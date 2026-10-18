# Security Specification - Dheluwang Undangan

## 1. Data Invariants
1. Orders require core customer details, physical shipping info, invitation specs, and wedding schedule info.
2. Orders submitted must not exceed size limits to prevent denial of wallet attacks.
3. Catalog items, gallery items, and FAQs are publicly readable so prospective brides & grooms can browse designs without signing up.
4. Updates to orders must preserve immutable creation timestamps and conform to schema.

## 2. Dirty Dozen Payloads Handled
- Payload with payload size > max limits is rejected.
- Payload missing required fields is rejected.
- Malformed order ID is rejected.
- Injection of arbitrary unauthorized admin flags is rejected.
