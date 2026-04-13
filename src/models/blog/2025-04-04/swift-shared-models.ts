import type { BlogPost } from '../types'
import ArchitectureDiagram from './swift-shared-models/ArchitectureDiagram.vue'

const post: BlogPost = {
  slug: 'swift-shared-models',
  dateLabel: 'April 13, 2025',
  eyebrow: 'Deep Dive · Swift 6.3',
  title: 'One Model to Rule Them All: Shared Packages Across iOS, Android & Backend',
  excerpt:
    'With Swift 6.3\'s cross-platform Foundation and official Android target, a single Swift package can be your source of truth for domain models across iOS, Android, and a Vapor backend.',
  content: [
    {
      type: 'paragraph',
      text: 'Every team that ships a mobile app alongside a backend eventually hits the same wall: the model diverges. The iOS engineer adds a field, the backend engineer renames it, and the Android engineer is left guessing which version of the truth is current. You write drift-detecting integration tests, but someone always forgets to run them.',
    },
    {
      type: 'paragraph',
      text: 'Swift 6.3 changes the rules. With stable Foundation cross-platform support, improved Swift Package Manager target conditioning, and stricter Sendable enforcement that forces you to reason about value semantics from the start, a shared model package is no longer a weekend experiment, but a viable production architecture. This post walks through exactly how to set it up, using <a href="https://github.com/iDevid/TriForce" target="_blank" rel="noopener">TriForce</a>, a real open-source demo.',
    },

    { type: 'heading', text: 'Why Now? What Swift 6.3 Adds' },

    {
      type: 'paragraph',
      text: 'Foundation is now consistent across platforms. Previously, Foundation on Linux and Android was a reimplementation with subtle behavioral differences. Swift 6.3 ships with a unified swift-foundation implementation that is the same code everywhere, compiled per-platform. Codable, Date, Decimal, URL: all behave identically.',
    },

    { type: 'heading', text: 'Architecture Overview' },

    {
      type: 'paragraph',
      text: 'TriForce is a Zelda-themed character roster app: an iOS app, an Android app, and a Vapor backend all share the same domain model with zero duplication. The monorepo splits shared code into two packages, both consumed by all three targets:<ul><li><strong>SharedModels</strong>: pure domain types, Codable conformances, validation logic. Used by all 3 platforms</li><li><strong>SharedNetworkLayer</strong>: generic HTTP client and service types that wrap it, used by iOS & Android.</li></ul>',
    },
    { type: 'component', component: ArchitectureDiagram },

    {
      type: 'paragraph',
      text: 'SharedModels contains only pure Swift: structs, Codable conformances, and validation logic. No UIKit. No Vapor. No Android-specific code. It has zero platform-specific dependencies, which is exactly what lets it compile everywhere.',
    },

    { type: 'heading', text: 'Setting Up the Packages' },

    {
      type: 'paragraph',
      text: 'TriForce splits shared code into two packages. SharedModels targets macOS 13+ (the baseline that covers Linux and Android). SharedNetworkLayer sits on top and can target iOS as well. On Android, both libraries are built as dynamic libraries so they can be loaded at runtime via JNI; on every other platform the default static linkage is fine.',
    },
    {
      type: 'paragraph',
      text: 'Keep models as value types. In TriForce, PlayerCharacter carries a string ID, a display name, and three integer stats, hearts, rupees, and attack power. Conforming to Sendable is trivial for structs of value types and makes the compiler enforce your intent across every consumer.',
    },
    {
      type: 'code',
      language: 'swift',
      code: `public struct PlayerCharacter: Codable, Hashable, Sendable, Identifiable {
    public let id: String
    public var name: String
    public var hearts: Int
    public var rupees: Int
    public var attack: Int
}`,
    },
    {
      type: 'paragraph',
      text: 'Business rules belong here too. If a character must have at least one heart to exist, that invariant should be enforced once, in an extension on the shared type. A ValidationError enum with clearly named cases gives every consumer the same vocabulary for failures.',
    },
    {
      type: 'code',
      language: 'swift',
      code: `public enum ValidationError: Error, Sendable {
    case invalidHearts   // must be >= 1
    case negativeRupees
    case invalidAttack   // must be >= 0
}

public extension PlayerCharacter {
    func validate() throws {
        guard hearts >= 1   else { throw ValidationError.invalidHearts }
        guard rupees >= 0   else { throw ValidationError.negativeRupees }
        guard attack >= 0   else { throw ValidationError.invalidAttack }
    }
}`,
    },

    { type: 'heading', text: 'Consuming on iOS' },

    {
      type: 'paragraph',
      text: 'Add both packages as local dependencies in your Xcode project. The SharedNetworkLayer\'s PlayerNetworkService wraps the generic HTTP client and returns [PlayerCharacter], the same struct the backend writes and the Android app reads. The view model is a straightforward @Observable wrapper.',
    },
    {
      type: 'code',
      language: 'swift',
      code: `import SharedModels
import SharedNetworkLayer
import Observation

@Observable @MainActor
final class CharacterListViewModel {
    var characters: [PlayerCharacter] = []
    var isLoading = false
    var error: Error?

    private let service = PlayerNetworkService()

    func load() async {
        isLoading = true
        defer { isLoading = false }
        do {
            characters = try await service.fetchCharacters()
        } catch {
            self.error = error
        }
    }
}`,
    },

    { type: 'heading', text: 'Consuming on the Backend (Vapor)' },

    {
      type: 'paragraph',
      text: 'Vapor runs on Linux. Since SharedModels\' macOS 13+ baseline covers Linux, just add it as a local dependency. Vapor\'s Content protocol builds on Codable, so you get response encoding for free with a single retroactive conformance. In TriForce, the backend simply returns PlayerCharacter.featured, the same static array defined in the shared package, serialised to JSON by the same Codable conformance iOS and Android use to deserialise it.',
    },
    {
      type: 'code',
      language: 'swift',
      code: `// backend/Sources/App/routes.swift
import Vapor
import SharedModels

extension PlayerCharacter: Content {}

func routes(_ app: Application) throws {
    app.get { req in
        "TriForce Vapor backend is running."
    }

    app.get("health") { req in
        ["status": "ok"]
    }

    app.get("characters") { req async throws -> [PlayerCharacter] in
        // Served from the shared package. Zero duplication.
        PlayerCharacter.featured
    }
}`,
    },

    { type: 'heading', text: 'Consuming on Android' },

    {
      type: 'paragraph',
      text: 'TriForce uses swift-java, Apple\'s official JVM interop tool, instead of hand-written @_cdecl bridges. You drop a swift-java.config file next to each package and the toolchain auto-generates the JNI glue. SharedModels compiles to libSharedModels.so, SharedNetworkLayer to libSharedNetworkLayer.so; both are packaged into the APK and loaded at runtime.',
    },
    {
      type: 'code',
      language: 'json',
      code: `{
  "javaPackage": "com.triforce.sharedmodels",
  "nativeLibraryName": "SharedModels",
  "mode": "jni"
}`,
    },
    {
      type: 'paragraph',
      text: 'With that config in place, Kotlin sees PlayerCharacter as a native type. No JSON parsing, no @_cdecl, no hand-written bindings, the struct that compiles on iOS compiles identically to a native Android library, with the same field names and the same Codable semantics.',
    },
    {
      type: 'code',
      language: 'swift',
      code: `{
  "javaPackage": "com.triforce.sharednetworklayer",
  "nativeLibraryName": "SharedNetworkLayer",
  "mode": "jni",
  "importedModuleStubs": {
    "SharedModels": ["public struct PlayerCharacter {}"]
  }
}`,
    },

    { type: 'heading', text: 'Testing: One Suite, Three Targets' },

    {
      type: 'paragraph',
      text: 'Write your model tests once using Swift Testing and run them on all three platforms in CI. A round-trip test encodes a PlayerCharacter to JSON and decodes it back, asserting equality. Validation tests confirm the invariants hold, a dead character (zero hearts) or negative rupees are rejected with the expected error.',
    },
    {
      type: 'code',
      language: 'swift',
      code: `import Testing
import Foundation
@testable import SharedModels

@Suite struct PlayerCharacterTests {

    @Test func roundTrip() throws {
        let original = PlayerCharacter(
            id: "link", name: "Link", hearts: 3, rupees: 0, attack: 5
        )
        let data = try JSONEncoder().encode(original)
        let decoded = try JSONDecoder().decode(PlayerCharacter.self, from: data)
        #expect(original == decoded)
    }

    @Test func rejectsZeroHearts() {
        let char = PlayerCharacter(id: "link", name: "Link", hearts: 0, rupees: 0, attack: 5)
        #expect(throws: ValidationError.invalidHearts) {
            try char.validate()
        }
    }

    @Test func rejectsNegativeRupees() {
        let char = PlayerCharacter(id: "link", name: "Link", hearts: 3, rupees: -1, attack: 5)
        #expect(throws: ValidationError.negativeRupees) {
            try char.validate()
        }
    }

    @Test func featuredRosterPassesValidation() throws {
        for character in PlayerCharacter.featured {
            try character.validate()
        }
    }
}`,
    },

    { type: 'heading', text: "What Doesn't Belong in SharedModels" },

    {
      type: 'paragraph',
      text: 'The temptation once this pattern is working is to put everything in the shared package. Resist it. The boundary is the package\'s long-term value.',
    },
    {
      type: 'paragraph',
      text: 'In SharedModels: domain models, enumerations, request/response DTOs, validation logic, pure business rules. In SharedNetworkLayer: the generic HTTP client and service types that wrap it, still no platform UI, no persistence. Out of both: CoreData, SwiftUI, UIKit, Android NDK calls.',
    },


    { type: 'heading', text: 'Encountered Difficulties' },

    {
      type: 'paragraph',
      text: 'Building TriForce surfaced a handful of problems that are worth knowing before you start.',
    },
    {
      type: 'paragraph',
      text: '<strong>Library type per platform.</strong> On iOS and macOS, static linking is the default and the right choice. On Android, the shared library must be dynamic so the runtime can load it via JNI. Package.swift has no built-in conditional for this. TriForce handles it with an environment variable checked at package evaluation time. Forgetting this produces a linker error that points at the wrong layer entirely.',
    },
    {
      type: 'paragraph',
      text: '<strong>Retroactive conformance in strict mode.</strong> Adding <code>extension PlayerCharacter: Content {}</code> in the Vapor target is a retroactive conformance: you\'re conforming a type you don\'t own to a protocol you don\'t own. Swift 6 strict concurrency mode emits a warning for this and will eventually make it an error. The fix is to wrap the conformance in your own intermediate type or to gate it with <code>@retroactive</code>.',
    },
    {
      type: 'paragraph',
      text: '<strong>swift-java module stubs.</strong> SharedNetworkLayer imports SharedModels, but swift-java can\'t see transitive Swift dependencies automatically. You have to declare a stub in the config\'s <code>importedModuleStubs</code> key so the toolchain knows the shape of types crossing the boundary. A missing or wrong stub produces a cryptic "symbol not found" at runtime rather than a compile-time error.',
    },

    { type: 'heading', text: 'Closing Thoughts' },

    {
      type: 'paragraph',
      text: 'The idea of writing your domain models once and having them compile everywhere is not new, it\'s the original promise of languages that target multiple runtimes. What Swift 6.3 delivers is a practical version of that promise: a unified Foundation, an official Android target, and a concurrency model that catches cross-platform unsafety at compile time rather than runtime.',
    },
    {
      type: 'paragraph',
      text: 'Start small. Fork <a href="https://github.com/iDevid/TriForce" target="_blank" rel="noopener">TriForce</a>, swap PlayerCharacter for your own domain model, and point the backend at your database. Add the Linux test target. Watch the compiler tell you things you didn\'t know were wrong. Then keep going.',
    },

    { type: 'heading', text: 'References' },

    {
      type: 'paragraph',
      text: '<ul><li><a href="https://github.com/iDevid/TriForce" target="_blank" rel="noopener">TriForce Repo</a></li><li><a href="https://www.swift.org/blog/nightly-swift-sdk-for-android/" target="_blank" rel="noopener">Swift.org: Announcing the Swift SDK for Android</a></li><li><a href="https://www.swift.org/documentation/articles/swift-sdk-for-android-getting-started.html" target="_blank" rel="noopener">Swift.org: Getting Started with the Swift SDK for Android</a></li><li><a href="https://github.com/swiftlang/swift-java" target="_blank" rel="noopener">swift-java</a></li></ul>',
    },
  ],
}

export default post
